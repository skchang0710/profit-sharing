##Consideration

The Session is a basic class for storing the profit data and handling the claim method. According to the requirements, I assume the sessions are sequential, not overlapping and not necessary to share informations with each other. They also have the state to verify whether it can be invested or claimed with a snapshot.

Having the Session class is not enough, it will be better for the system to provide convenient interface with current state instead of sending session id specifically. So the Core class is considered to wrap sessions and control the behaviors with state from "MaxClaimableSession" and "getCurrentSession" function. Moreover, the investments should be a Core state because they are not changed by session states.

