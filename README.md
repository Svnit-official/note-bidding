## Running as a container service
### Setting Up Docker
1. **Uninstall old versions of docker**
```
sudo apt-get remove docker docker-engine docker.io containerd runc
```

2. **Set up the repository**
```
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

3. **Install docker**
```
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
*To verify the installation of docker, run:*
`sudo docker run hello-world`

4. **Install docker-compose**
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

5. **Apply executable permissions to the binary:**

```
sudo chmod +x /usr/local/bin/docker-compose
```
*Note: If the command `docker-compose` fails after installation, check your path. You can also create a symbolic link to `/usr/bin` or any other directory in your path.*
*For example:*
```
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
*To verify the installation of docker-compose, run:* 
`docker-compose --version`

4. **Start the app**
from root directory, run:
```
docker-compose up
```
to rebuild the app:
```
docker-compose up --build
```

### Seeding data
Data can be modified in ```/server/seed-data/```
From root directory, to delete old data, run:
```
node /server/seed-data/import.js --delete
```
to seed data:
```
node /server/seed-data/import.js --import
```
The docker container should be running for these commands to execute.

Head over to ```http://localhost:3000``` to test the app.
