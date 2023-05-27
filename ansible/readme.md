## Folder content
-- host_vars: This is where you specigy you variables which will be used by your playbook

-- roles: Roles the ansible will perform

-- static: All the static files that you might want to used in your ansible run

-- ansible.cfg: Configuration file for ansible. Always retrict its read & write permissoin to yourself.

-- hosts: Hosts that you wanted to connect

-- openrc.sh: Authentication file for melbourne research cloud. You should replace it with your own file.

-- playbook_deploy.yml: Create instances and deploy applications

-- playbook_scale.yml: Add one more mastodon haverster to our existing instaces

-- run.sh: Entrypoint to run playbook_deploy.yml

-- scale.sh: Entrypoint to run playbook_scale.yml
