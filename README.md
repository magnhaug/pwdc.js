pwdc.js
=======

Numerous slow-hashing algorithms are developed aiming to reduce the feasibility of offline brute force password attacks.
The burden of securing a password should be with the client, not the server, in an application that aims to scale effortlessly.

This is a quick-n-dirty PoC showing how that might be done, using a toy slow-hashing algorithm (didnt bother finding a decent bcrypt implementation in JS).

Flow:

1. Client slow-hashes password with the username as a salt. (here: N rounds of sha256, should use scrypt or bcrypt)
1. Client submits hashed password instead of written password.
1. Server hashes password 1 more time before storage, with a cryptographically secure hashing algorithm and a secret user salt.
1. Achievement unlocked: Cheap-ass slow-hashing, and no users on legacy browsers able to enter your site. Win-win!

Conclusion:

- Good: This largely disables [DDoS-by-bcrypt](http://www.analyticalengine.net/2012/06/one-of-many-problems-with-appsec/) attacks and alleviates the cost increase of using a slow hashing function.
- Good: No clear-text passwords will be sent through the network even if your site is using plain http (will protect those that use the same password everywhere).
- Bad: It simply won't work too well if your users are stuck using inferior browsers or devices.
- Bad: Even with modern browsers, we'd appreciate hardware acceleration. With Chrome I get about 30 000 rounds per second, which would make an attacker with a good CPU able try 100 000 passwords per second.