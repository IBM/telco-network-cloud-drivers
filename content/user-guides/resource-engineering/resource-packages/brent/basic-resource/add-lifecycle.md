---
title: Add Lifecycle
weight: 60
---

# Create Lifecycle and Operation Scripts

The next step is to create scripts for the the standardized lifecycles (start, stop, configure, install, integrity and uninstall) and operations defined in the resource descriptor.

The scripts may be implemented using any scripting language of choice, as long as there is a Resource Driver capable of executing them. Scripts are located in a subdirectory of the 'Lifecycle' directory of the resource package, named after the type of the Resource driver that will use them. The contents of this directory is defined by the Resource driver. For example, in this example we are using the [Ansible Lifecycle driver](https://github.com/accanto-systems/ansible-lifecycle-driver), each lifecycle script maps to an Ansible playbook that is called the same as the lifecycle step, and is located in the 'Lifecycle/ansible/scripts/' directory. The Configure script would be located at 'Lifecycle/ansible/scripts/Configure.yml' or 'Lifecycle/ansible/scripts/Configure.yaml' (note: case is important). More information about Ansible playbooks can be found [here](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html).

A resource package does not need to implement all lifecycle scripts, only those defined in the resource descriptor.

In addition to the standard lifecycle scripts, specific operations may also be added. Operations are bespoke transitions that are invoked by the Resource manager when Telco Network Cloud Orchestration (TNCO) is establishing relationships between two resources. These allow for action to take place between the resources to enable a Network Service to work. Operations and their definitions are part of the public interface of a resource. 

Create an operation by adding the operation script in the 'Lifecycle/ansible/scripts' folder where the name of the operation is the name of the script. For example, the "deleteNetworkInterface" script should be located in the file 'Lifecycle/ansible/scripts/deleteNetworkInterface.yml' or 'Lifecycle/ansible/scripts/deleteNetworkInterface.yaml' (note, case is important).

# Add Lifecycle Scripts

If you've completed the earlier sections to this guide then you should be in possession of a project for a Resource, which when instantiated, creates some basic infrastructure to standup a compute instance.

We now need to add some software to our a Resource to give it a real function. Typically, a Resource engineer would achieve this by adding scripts to be executed as part of the Install, Configure and Start transitions.

We will be using the Ansible lifecycle driver, so our scripts will take the form of playbooks.

## Configure Inventory

To use the Ansible lifecycle driver we will need to setup an inventory file which tells Ansible how to SSH to the compute instance created as part of the Resource infrastructure.

Update the `inventory` file under the `Lifecycle/ansible/config` with the following contents:

```
[resource]
resource-inst
```

Rename the `example-host.yml` file under the `Lifecycle/ansible/config/host_vars` directory to `resource-inst.yml` (it's important to Ansible that this file matches the name of our host, which is shown on the 2nd line of our inventory file)

```
mv Lifecycle/ansible/config/host_vars/example-host.yml Lifecycle/ansible/config/host_vars/resource-inst.yml 
```

Update the contents of `resource-inst.yml` with:

```
---
ansible_host: {{ properties.public_ip }}
ansible_user: ubuntu
ansible_ssh_pass: ubuntu
ansible_become_pass: ubuntu
ansible_sudo_pass: ubuntu
```

The value of `ansible_host` is set a templated variable. This allows us to configure the inventory at runtime with a property from our instance. In this case, as we don't know the IP address of the compute instance until it has been created, we will substitute the address at runtime using the `public_ip` property (remember this property is in our Resource descriptor and is set by an output with the same name in our infrastructure template).

## Add Install 

The install lifecycle transition is a suitable time to:

- check the infrastructure is ready for use (check we can SSH to it)
- install any software required by the Resource

We will add a script to install Apache2 as a service:

Create a new file called `Install.yaml` in `Lifecycle/ansible/scripts`

```
touch Lifecycle/ansible/scripts/Install.yaml
```

Add the following content to the playbook. The tasks listed will install Apache2 but not start it

```
- name: Install
  hosts: resource
  become: yes
  gather_facts: False
  tasks:
  - name: Pause for Python
    raw: while [ -z "$(command -v python)" ]; do sleep 1; done
  - name: Prevent apache2 auto-starting on install)
    shell: ln -s /dev/null /etc/systemd/system/apache2.service
  - name: Install apache2
    retries: 60
    delay: 1
    apt:
      update_cache: yes
      name: apache2
    register: apache_install
    until: '"Could not get lock" not in apache_install["stderr"]'
  - name: Verify service apache2
    systemd:
      name: apache2
      state: started
      enabled: yes
      masked: no
```

Now on an install transition, Apache2 will be installed on the compute instance of the Resource.

## Add Configure 

The configure lifecycle transition is a suitable time to setup configuration files or any other auxiliary items required by the intended software so it is ready to use.

In this guide we will add a script to configure Apache2's default site with our own content.

In `Lifecycle/ansible/scripts` create a new directory called `site`, then create an `index.html` file in that directory

```
mkdir Lifecycle/ansible/scripts/site && touch Lifecycle/ansible/scripts/site/index.html
```

Update `index.html` with the following content

```
<html>
<head>
    <title>Hello, {{ properties.greeting_receiver }}</title>
</head>
<body>
    <h1>Hello, {{ properties.greeting_receiver }}</h1>
    <p>Success!</p>
</body>
</html>
```

In `Lifecycle/ansible/scripts` create a new directory called `conf`, then create a `hw-site.conf` file in that directory

```
mkdir Lifecycle/ansible/scripts/conf && touch Lifecycle/ansible/scripts/conf/hw-site.conf
```

Update `hw-site.conf` with the following content

```
<VirtualHost *:{{properties.site_port}}>
    ServerAdmin {{properties.site_admin_email}}
    DocumentRoot /var/www/{{properties.site_name}}
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Create a new file called `Configure.yaml` in `Lifecycle/ansible/scripts`

```
touch Lifecycle/ansible/scripts/Configure.yaml
```

Add the following content to the playbook. The tasks listed will add a new site to Apache2 and remove the default

```
---
- name: Configure
  hosts: resource
  become: yes
  gather_facts: False
  tasks:
    - name: Disable default site
      command: a2dissite 000-default.conf
      failed_when: false
 
    - name: Remove default site config
      file:
        state: absent
        path: /etc/apache2/sites-available/000-default.conf

    - name: Create new site directory
      file:
        state: directory
        path: /var/www/{{ properties.site_name }}
    
    - name: Copy site html
      template:
        src: site/index.html
        dest: /var/www/{{ properties.site_name }}/index.html
        mode: '0755'
    
    - name: Add site config
      template:
        src: conf/hw-site.conf
        dest: /etc/apache2/sites-available/hw-site.conf
        mode: '0755'
    
    - name: Enable new site
      command: a2ensite hw-site.conf
```

You may have noticed a few additional properties referenced in these files, such as `site_name`, they must be added to our descriptor. Open `Definitions/lm/resource.yaml` and add the new properties.

```
properties:
  ...other properties...
  greeting_receiver:
    default: world
    description: Name to append to the greeting on the default site (i.e. Hello, World!)
  site_port:
    default: 80
    description: Port to bind the apache2 site
  site_admin_email: 
    default: host@localhost
    description: ServerAdmin setting for the apache2 site
  site_name:
    default: hw
    description: Name given to the apache2 site
```

## Add Start

The start lifecycle transition is a suitable time to activate/enable software so it is ready for use. In this guide we will add a script to start our configured Apache2 site.

Create a new file called `Start.yaml` in `Lifecycle/ansible/scripts`

```
touch Lifecycle/ansible/scripts/Start.yaml
```

Add the following content to the playbook

```
---
- name: Start
  hosts: resource
  become: yes
  gather_facts: False
  tasks:
    - name: Restart apache2
      systemd:
        state: restarted
        name: apache2
```

## Add Stop

As we have a start transition which enables the Apache2 service it is a good idea to also add a stop, which will disable the Apache2 service.

Create a new file called `Stop.yaml` in `Lifecycle/ansible/scripts`

```
touch Lifecycle/ansible/scripts/Stop.yaml
```

Add the following content to the playbook

```
---
- name: Stop
  hosts: resource
  become: yes
  gather_facts: False
  tasks:
    - name: Stop apache2
      systemd:
        state: stopped
        name: apache2
```

# Enabling Lifecycle Transitions

To indicate to LM that the Resource supports additional transitions we must update the Resource descriptor (`Definitions/lm/resource.yaml`). Open this file and add "Install", "Configure", "Start" and "Stop" to the list of supported lifecycle:

```
infrastructure:
  Openstack: {}
lifecycle:
  Create:
    drivers:
      openstack:
        selector:
          infrastructure-type:
          - Openstack
  Install:
    drivers:
      ansible:
        selector:
          infrastructure-type:
          - Openstack
  Configure:
    drivers:
      ansible:
        selector:
          infrastructure-type:
          - Openstack
  Start:
    drivers:
      ansible:
        selector:
          infrastructure-type:
          - Openstack
  Stop:
    drivers:
      ansible:
        selector:
          infrastructure-type:
          - Openstack
  Delete:
    drivers:
      openstack:
        selector:
          infrastructure-type:
          - Openstack

```

Notice how `ansible` is used under `drivers` section to each lifecycle Install, Configure, Start, and Stop, while Create and Delete use `openstack`. This section defines which Resource Driver should be used to handle the transition for the default infrastructure type. Since `ansible` is being used for the majority of lifecycle steps here, a more succint way of specifying this is as follows:

```
infrastructure:
  Openstack: {}
default-driver:
  ansible:
    selector:
      infrastructure-type:
        - Openstack
lifecycle:
  Create:
    drivers:
      openstack:
        selector:
          infrastructure-type:
          - Openstack
  Install: {}
  Configure: {}
  Start: {}
  Stop: {}
  Delete: {}
    drivers:
      openstack:
        selector:
          infrastructure-type:
          - Openstack
```

The `default-driver` section specifies to use `ansible`, unless overridden by a `drivers` definition in a specific lifecycle configuration.

# Re-instantiate

The Resource is ready for usage. Push the Resource to your target environment and create an instance of the Assembly (created earlier in [Instantiate Resource](/user-guides/resource-engineering/resource-packages/brent/basic-resource/instantiate-resource)). 

You'll see the Install, Configure and Start transitions execute for the Resource, upon completion you should be able to access the hosted site with at: `http://<public_ip>:<site_port>`.

To see the Stop transition execute, make the Assembly inactive by opening the "New Intent" dropdown in the top right and selecting "Make Inactive".