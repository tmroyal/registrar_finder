# Source for domainregistrarfinder.com

This repo comprises the source code for domainregistrarfinder.com.

I wanted something more accessible than `whois` so I created a web interface for a simply defined Flask endpoint using `python-whois`.

The software development side of this project was easy for me. The challenge was to learn how to automatically deploy the site on merge to `main`.

## Infrastructure

This site has the following infrastructure:
- static site hosting on s3
- docker container deployment to ECS
- Application Load Balancer
- Routes defined in Route 53

## Todo

- https
- finishing touches with URLs etc.
