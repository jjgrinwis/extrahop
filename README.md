# Extrahop

created an Extrahop flow trigger.
This trigger will create new key-value pair based on IP info like:
10.160.35.38|10.160.35.60|TCP|443 525324
10.160.35.37|10.160.39.125|UDP|53 123412

RESTful call will retrieve info based on device group.
Just select a device group and above info will be retrieved.

When testing, fill in your API key and point it to your own Extrahop Discover Appliance.
Example file is now pointing to our internal private lab setup.
