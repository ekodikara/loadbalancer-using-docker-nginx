# ZERO downtime with Docker & Nginx:

## Build Docker Images

    docker build -t my-app:1.0 .
    docker build -t my-app:2.0 .

container names or above are app_v1 and app_v2 as servers in nginx

## Then run nginx

    docker-compose up -d
Adjust the nginx.conf to point to the new version, if needed, or handle load balancing between versions.

browse the web http://localhost:3003/

## 	ZERO downtime - Graceful Shutdown of Old Version:

docker compose stop app1 (assume app1 need to upgrade, app1 is the service name in docker-compose.yml)

## Before switch

    upstream app {
        server app_v1:3000;  # Old version
        server app_v2:3000;  # New version
    }

## After switch (changed the nginx config)

    upstream app {
        # Remove the old version
        # server app_v1:3000;  
        server app_v2:3000;  # New version
    }

## Reload Nginx

    docker exec nginx-server nginx -s reload 

## Stop and remove orphans images

    docker compose down --remove-orphans 

## `Alternative way with HAProxy`
Stop one of the server and then run this.

    docker compose stop app1

After change the servers from the HAProxy config do this.
    
    docker exec haproxy-server haproxy -f /usr/local/etc/haproxy/haproxy.cfg -sf $(pgrep haproxy)

Have fun!