---
title: Install
weight: 100
---

This section assumes you have followed the configuration steps and now have:

- a CI/CD Hub Helm chart
- a custom values YAML file

# Installing with Helm

Install CI/CD Hub with the `helm install` command:

Standard:
```
helm install <cicdhub-helm-chart> --name <your-release-name> --namespace <your-namespace> -f <your-custom-values-file>
```

ICP:
```
helm install <cicdhub-helm-chart> --name <your-release-name> --namespace <your-namespace> -f <your-custom-values-file> --tls
```

- `cicdhub-helm-chart` - path to the CI/CD Hub Helm chart
- `your-release-name` - unique name used to identify this installation in Helm
- `your-namespace` - Kubernetes namespace to install into (leave out to use default)
- `your-custom-values-file` - path to the YAML file created with any configuration overrides (if you have any)

For example:

```
helm install cicdhub-2.0.5.tgz --name cicdhub --namespace cicdhub -f custom-values.yaml
```

{{%note %}}
For an ICP environment you will need to include `--tls` with helm commands
{{%/note %}}

Check the status of your installation with helm or kubectl:

```
kubectl get pods -n <your-namespace>
```

Standard:
```
helm status <your-release-name>
```

ICP:
```
helm status <your-release-name> --tls
```

Wait for all pods to show least one ready instance.

# Update storage to prevent data loss

Persistent volumes dynamically provisioned have a default reclaim policy of `Delete` - this means the volume will be deleted when the claim for it is removed, which takes place on an uninstall. It is recommended to update the policy to `Retain` so any data can be recovered or the volume can be removed manually.

List the volumes in your cluster to find any that may need updating.

```
kubectl get pv
```

For each volume you wish to update, use `patch` to change the policy:

```
kubectl patch pv <your-pv-name> -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
```

# Accessing Services

**It is recommended that you access each service and any default username/passwords immediately**

Be sure to update any ports, hostnames, usernames and passwords shown if you provided overrides in your `custom values` file.

## Gogs

Access the UI in your browser by navigating to `http://<your-cicdhub-host>:32734` or `git.cicdhub:<ingress-port>` (see [using Ingress hosts](#ingress)).

There is no default user for Gogs, instead you must register an account through the UI (or API). The first registered user will automatically be assigned the admin role.

## Jenkins

Access the UI in your browser by navigating to `http://<your-cicdhub-host>:32732` or `jenkins.cicdhub:<ingress-port>` (see [using Ingress hosts](#ingress)).

The default username and password is `admin/admin`, unless you provided alternatives.

## Openldap

Accessing Openldap requires an LDAP enabled client tool such as [LDAP Admin](http://www.ldapadmin.org/). Create a new connection with the following settings:

- Host: `<your-cicdhub-host>`
- Port: `32737`
- Base: `dc=lm,dc=com` (change to reflect your chosen domain if overridden. For example, `example.com` would become: `dc=example,dc=com`)
- Username: `cn=admin,dc=lm,dc=com` (repeat changes to `dc=` as above)
- Password: `admin` (change to reflect your chosen managerPassword if overridden)

### Configure Openldap with TNC-O Users

To make the Openldap installed as part of the CI/CD Hub usable in TNC-O environments, you will need to create the user schema.

First create a file named `schema.ldif` and add the following contents:

```
dn: cn=schema,cn=config
changetype: modify
add: olcAttributeTypes
olcAttributeTypes: ( 2.25.128424792425578037463837247958458780603.1
        NAME 'isSuspended'
        DESC 'Is user suspended'
        EQUALITY caseIgnoreMatch
        SUBSTR caseIgnoreSubstringsMatch
        SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 )
-
add: olcObjectClasses
olcObjectClasses: ( 2.25.128424792425578037463837247958458780603.3
    NAME 'extendedPerson'
    DESC 'extendedPerson'
    SUP person
    STRUCTURAL
    MAY  (isSuspended)
 )
```

Import this LDIF file to Openldap with an LDAP client. For a Unix based system you can install `ldap-utils`:

```
sudo apt-get install ldap-utils
```

Then use the `ldapmodify` command: 

```
ldapmodify -acx -H ldap://<your-cicdhub-host>:32737 -D "cn=admin,cn=config" -w config -f schema.ldif
```

Create a second file named `users.ldif` and add the following contents:

```
dn: ou=groups,dc=lm,dc=com
objectclass: top
objectclass: organizationalUnit
ou: groups

dn: ou=people,dc=lm,dc=com
objectclass: top
objectClass: organizationalUnit
ou: people

dn: uid=Jack,ou=people,dc=lm,dc=com
objectClass: extendedPerson
objectClass: uidObject
cn: Jack
sn: Jack
uid: Jack
# BCrypt encdoded version of 'jack'
userPassword: $2a$10$nwrT968GpcF8/EWyO3yBQOuIcB7a/PBHZ2bMMX0JuuAx5X04GmxJi

dn: uid=Jill,ou=people,dc=lm,dc=com
objectClass: extendedPerson
objectClass: uidObject
cn: Jill
sn: Jill
uid: Jill
# BCrypt encdoded version of 'jill'
userPassword: $2a$10$2qVcIE3iEdaKpQZUdJtVeuGWE2rzF7PTXwqfwa6.ZcylO9XmEmMVu

dn: uid=John,ou=people,dc=lm,dc=com
objectClass: extendedPerson
objectClass: uidObject
cn: John
sn: John
uid: John
# BCrypt encdoded version of 'john'
userPassword: $2a$04$17kY20gJy5KpWCgtypxoTeIhYuGbKTtHm7BJyuGZKkL0Y/78P2iRO

dn: uid=Jane,ou=people,dc=lm,dc=com
objectClass: extendedPerson
objectClass: uidObject
cn: Jane
sn: Jane
uid: Jane
# BCrypt encdoded version of 'jane'
userPassword: $2a$04$XG5p82YSksI26F43EgHoQ.kwX6ubQMw1J5f6sxKlupzpUiDTW1giu

#Test user with rootSecAdmin access rights only
dn: uid=Derek,ou=people,dc=lm,dc=com
objectClass: extendedPerson
objectClass: uidObject
cn: Derek
sn: Derek
uid: Derek
# BCrypt encdoded version of 'derek'
userPassword: $2a$04$HiXRVJyVos2nP/9/bx2FReH3YrIlFdsjhPCJJZM16mvd/fpluUAC6

#Test user with no access rights
dn: uid=Lisa,ou=people,dc=lm,dc=com
objectClass: extendedPerson
objectClass: uidObject
cn: Lisa
sn: Lisa
uid: Lisa
# BCrypt encdoded version of 'lisa'
userPassword: $2a$04$c4sf/e7uAaWR1hvSbc60Gelyhf78l8EBv2rpelrD0yPO/VWYNapa.

#Test user with readOnly access rights
dn: uid=Kim,ou=people,dc=lm,dc=com
objectClass: extendedPerson
objectClass: uidObject
cn: Kim
sn: Kim
uid: Kim
# BCrypt encdoded version of 'kim'
userPassword: $2a$04$U.7kTWv95LajKcBqMWKtJuI1FaFZzNjc3k5.J4uMMi5puN4rc8GI2

#Test user, Suspended user with SLMAdmin access rights
dn: uid=Steve,ou=people,dc=lm,dc=com
objectClass: extendedPerson
objectClass: uidObject
cn: Steve
sn: Steve
uid: Steve
isSuspended: true
# BCrypt encdoded version of 'steve'
userPassword: $2a$10$nj.uwhp660e3DJveI84QGumuM5b9yrqNp4KLEWEXr.pxAO0U4Ok6C

dn: cn=SLMAdmin,ou=groups,dc=lm,dc=com
objectclass: groupOfNames
cn: SLMAdmin
member: uid=Jack,ou=people,dc=lm,dc=com
member: uid=John,ou=people,dc=lm,dc=com
member: uid=Jane,ou=people,dc=lm,dc=com
member: uid=Steve,ou=people,dc=lm,dc=com

dn: cn=Portal,ou=groups,dc=lm,dc=com
objectclass: groupOfNames
cn: Portal
member: uid=Jill,ou=people,dc=lm,dc=com

dn: cn=RootSecAdmin,ou=groups,dc=lm,dc=com
objectclass: groupOfNames
cn: RootSecAdmin
member: uid=Jane,ou=people,dc=lm,dc=com
member: uid=Derek,ou=people,dc=lm,dc=com

dn: cn=ReadOnly,ou=groups,dc=lm,dc=com
objectclass: groupOfNames
cn: ReadOnly
member: uid=Kim,ou=people,dc=lm,dc=com
```

Import the file into Openldap:

```
ldapmodify -acx -H ldap://<your-cicdhub-host>:32737 -D "cn=admin,dc=lm,dc=com" -w admin -f users.ldif
```

## Nexus

Access the UI in your browser by navigating to `http://<your-cicdhub-host>:32739`. API requests may also be made to this address.

The default username and password combination is `admin/admin123`.

## Docker Registry

The docker registry can be accessed through the official docker client. Images can be pushed to and pulled from the registry using `<your-cicdhub-host>:32736`. You will need to add the registry address as an insecure registry in your docker daemon file (usually located at `/etc/docker/daemon.json`):

```
{
    "insecure-registries": [
        "<your-cicdhub-host>:32736"
    ]
}
```

The example commands below show how to pull an image from Docker Hub and push it into the registry:

```
docker pull hello-world
docker tag hello-world <your-cicdhub-host>:32736/hello-world
docker push <your-cicdhub-host>:32736/hello-world
```

## Ingress

The `nginx-controller` is ready to serve HTTP traffic at `http://<your-cicdhub-host>:32080` and HTTPS traffic at `https://<your-cicdhub-host>:32443`. As Ingress uses the hostname to route traffic to the desired service, you will need to either:

- add the hostname(s) to your hosts file
- configure a proxy (such as Apache2) to route traffic to the target Kubernetes ingress controller
- configure a nameserver to route traffic targeting the hostname(s) to your Kubernetes cluster

### Update Hosts File

Adding hostnames to your hosts file is an easy way to get started but is not suitable long term as this will need to be repeated on every machine that will access the Hub.

If you'd like to configure access to Ingress routes this way, then add the following to your hosts file:

```
<your-cicdhub-server-ip-address>      jenkins.cicdhub git.cicdhub
```

You may now access Jenkins at `http://jenkins.cicdhub:32080` and Gogs at `http://git.cicdhub:32080`.

### Proxy with Apache2

If you have an available Apache2 server (or can install one) then it's possible to make the Ingress hosts available through an IP address.

You will need to add the Ingress hostnames to the hosts file of the machine running Apache2, see [Hostfile](/installation/cicdhub/install-cicdhub/#update-hostfile).

Create a site configuration file:

```
touch /etc/apache2/sites-available/cicdhub.conf
```

Add the following configuration to the file, updating the Ingress hostnames and ports if overridden. Replace `<your-gogs-proxy-port>` and `<your-jenkins-proxy-port>` with desired ports for your instances.

```
Listen <your-gogs-proxy-port>
<VirtualHost *:<your-gogs-proxy-port>>
        ProxyPass / http://git.cicdhub:32080/
        ProxyPassReverse / http://git.cicdhub:32080/
</VirtualHost>

Listen <your-jenkins-proxy-port>
<VirtualHost *:<your-jenkins-proxy-port>>
        ProxyPass / http://jenkins.cicdhub:32080/
        ProxyPassReverse / http://jenkins.cicdhub:32080/
</VirtualHost>
```

Add the site to Apache2 (you may need to reload the Apache2 service for the changes to take affect):

```
a2ensite cicdhub.conf
```

You may now access Jenkins at `http://<apache2-server-ip>:<your-jenkins-proxy-port>` and Gogs at `http://<apache2-server-ip>:<your-gogs-proxy-port>`.
