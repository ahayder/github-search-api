# A simple Github repo search page

## How to run this project?
```yarn install```

``` yarn dev ```

## Limitations:
- This project is using Github API without any authentication which has a limit of 10 requests per minute.
- There are some actions we can take to improve it further:
  - Seperate the throttle function from the hook
  - Using Github authentication for the API call
  - Using env file to store the API credentials
