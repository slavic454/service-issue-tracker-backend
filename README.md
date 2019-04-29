# service-issue-tracker-backend
Backend service for issue-tracker

## Example .env file with configuration:

```shell
ISSUE_TRACKER_MONGO_PORT = 27017
ISSUE_TRACKER_MONGO_HOST = localhost
ISSUE_TRACKER_MONGO_DATABASE = issueTracker
ISSUE_TRACKER_SERVER_PORT = 8299
ISSUE_TRACKER_API_PREFIX = /api
ISSUE_TRACKER_LOG_LEVEL = debug
```

## API

| Method | URL | Description |
| --- | --- | --- | --- |
| GET | ${apiPrefix}/issues?page=1&limit=20 | Returns paginated list of issues, query params limit and page are optional |
| PUT | ${apiPrefix}/issues/:id | Update issue resource with provided :id |
| POST | ${apiPrefix}/issues | Create issue resource |

## Example usage

```shell
 curl -X POST http://localhost:8299/api/issues -H "Content-Type: application/json" -d '{"title":"asddsa", "description": "asddasdsadsasad", "status":"open"}'
 ```

```shell
curl -X PUT http://localhost:8299/api/issues/5cc45264ef6274859580182e -H "Content-Type: application/json" -d '{"status":"open", "title": "you title", "description": "in current issue.."}'
```

