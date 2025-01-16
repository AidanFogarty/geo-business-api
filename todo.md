# TODO Items for Future Development

> **Note on Initial Implementation**
> The following items were intentionally omitted from the initial implementation due to:
>
> - Keeping the solution focused on core requirements
> - Avoiding over-engineering for a proof of concept
> - Maintaining simplicity for review purposes

## Things to do

### Authentication & Security

- Implement API authentication (e.g., JWT, OAuth2)
  - Not implemented initially as it wasn't specified in requirements
  - Would be essential for any production deployment
- Add rate limiting
- Add request logging & audit logging

### Infrastructre & Deployment

- Create terraform/AWS CDK configuration for cloud infrastructure
  - Docker configuration was provided as a starting point
  - Full infrastructure as code would be overkill for a POC
- Configure automated deployments via GitHub Actions
  - Basic CI pipeline was implemented to demonstrate testing approach
  - Full deployment pipeline would depend on chosen cloud provider

### Database

- Add database migrations
  - Decided to use drizzle-kit to quickly push db schema changes for development
  - So would let drizzle ORM manage the migrations in production
- Create postgres production database, ideally with a managed service with read replicas, auto backups, monitoring, etc.

### Some other things

- Better testing, I used locally running postgres container to test. Would use [testcontainers](https://testcontainers.com/) in reality.
- Add some API docs, swagger, redoc etc.
- A structured logging framework. Not sure of reccommended JS/TS logging framework. Something similar to [powertools for python](https://docs.powertools.aws.dev/lambda/python/latest/core/logger/) or [log/slog for Golang](https://pkg.go.dev/log/slog)

### Potential API limitations

- Can't do pagination but implements a limit parameter.
- Endpoints needed to create/update/delete businesses.
- Could add some more info to the business object, opening hours, review/rating, business logo etc.
