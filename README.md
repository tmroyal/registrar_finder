# Source for domainregistrarfinder.com

This repo comprises the source code for domainregistrarfinder.com.

I wanted something more accessible than `whois` for finding domain registrars so I created a web interface for a simply defined Flask endpoint using `python-whois`.

## Infrastructure

This site has the following infrastructure:
- static site hosting on s3
- docker container deployment to ECS
- Application Load Balancer
- Routes defined in Route 53
