## Consideration

According to the assignment example, I assume the sessions are sequential, not overlapping, and not necessary to share information with each other. They also have the state to verify whether it can be invested or claimed with a snapshot. The session is a basic class for storing the profit data and handling the "claim" method.

Having the Session class is not enough, it will be better for the system to provide a convenient interface with the current state instead of sending session id specifically. So the Core class is considered to wrap sessions and control the behaviors with state from the "MaxClaimableSession" and the "getCurrentSession" function. Moreover, the investments should be a Core state because they are not changed by session states.

![alt text](https://github.com/skchang0710/profit-sharing/blob/main/profit-sharing-flow.jpeg)

## How to test

### 1. Install packages
Using the Nodejs version 14.17.X is highly recommended.
```
npm ci
```
### 2. Run the jest test
```
npm test
```

### 3. Inspect the code
You may see the result like the following. The two files those paths show in the photo contain the test code that can help you inspecting if this project conforms to the requirements.
![alt text](https://github.com/skchang0710/profit-sharing/blob/main/test-result.png)
