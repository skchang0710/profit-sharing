##Consideration

According to the assignment example, I assume the sessions are sequential, not overlapping, and not necessary to share information with each other. They also have the state to verify whether it can be invested or claimed with a snapshot. The session is a basic class for storing the profit data and handling the "claim" method.

Having the Session class is not enough, it will be better for the system to provide a convenient interface with the current state instead of sending session id specifically. So the Core class is considered to wrap sessions and control the behaviors with state from the "MaxClaimableSession" and the "getCurrentSession" function. Moreover, the investments should be a Core state because they are not changed by session states.

![alt text](https://github.com/skchang0710/profit-sharing/blob/main/profit-sharing-flow.jpeg)
