### Reverse Engineering TikTok | Part Two

In this part of the series, I will be focusing on the TikTok signing headers. These include X-Gorgon, X-Ladon, X-Argus and X-Khronos. I will go over finding where the headers are added, the significance of headers on the Request, and where the headers are generated.

First we need to find where the headers are being added to the Request. This is easier said than done, because TikTok is completely bloated with random stuff, which makes it harder to search through the code. They also are careful to make it harder to search for the Header values, unlike in past APK versions where you could simply search “X-Gorgon” and find it.

![](https://cdn-images-1.medium.com/max/1412/1*kos7kpNhiW4mwkua3Qzlqg.png)

Instead (this might be cheating a little bit) of trying to find the header generation completely from scratch, we are going to use some prior knowledge. In a really old version of the app, in the same class as the header generation, there was a method named Bill, so let’s check to see if Bill still exists:

![](https://cdn-images-1.medium.com/max/1412/1*1LFdvsc3UZFXGT8lwZgbPA.png)

Bill is located in the package `ms.bd.o` , so lets check out that package. We are looking for a function that will probably take some kind of Request object, and return a Request object, or headers. When searching, I found a method: `onCallToAddSecurityFactor` , which seems to satisfy those requirements, and the name seems to match what we are looking for.

![](https://cdn-images-1.medium.com/max/1412/1*VRvBI6qa0kLHYGiTCvGh1g.png)

It takes two parameters: (String, Map<String, List<String>>), and returns a Map<String, String>. The parameters could be a URL, and Headers, and it could return headers, but let’s check to make sure:

![](https://cdn-images-1.medium.com/max/1412/1*db-8drJvjK4dBtIN0Rqa1g.png)

![](https://cdn-images-1.medium.com/max/1412/1*uIlc6sEDj2Snt0kqzcctTg.png)

We can see that we did find the correct function, where it seems to accept a URL & Header parameters, then returns the security headers. It also seems to only include certain headers for more valuable endpoints, like the one shown at the top of the screenshot. Now that we know what method TikTok calls to add that security, let’s figure out what the method does. Like shown above, JadX was unable to provide code for the method, but I can still view it in simple terms. The code contains a lot of lines like this, where it seems to be trying to obfuscate the logic of the method:

![](https://cdn-images-1.medium.com/max/1412/1*Z9FVL0F05_Ic7Ncgj7uA-w.png)

k.a is a native method, meaning it’s implemented in the libraries, not in the Java code, so even though I can’t see the source for it in JadX, I’m still going to try to call it to see what it returns, to try and clear up the logic:

![](https://cdn-images-1.medium.com/max/1412/1*8hyhI4fHFNz8e9jB1q672Q.png)

After looking through the logic, it seems to be pretty basic, just checking certain parts of the Request, like http vs. https, so I started looking for where the function would use the parameters given, and found this:

![](https://cdn-images-1.medium.com/max/1412/1*tW4PV3xvZlCxWQSfY335BA.png)

Instead of calling `k.a` now, let’s hook it instead, to see what input/output happens with it.

![](https://cdn-images-1.medium.com/max/1412/1*Udhh1HuMuuP8FKDVC-i1ug.png)

The data seems to be mostly just for the obfuscation things,

![](https://cdn-images-1.medium.com/max/1412/1*BdDT4kPjzQhzUkvzDL2uGA.png)

until a request is made:

![](https://cdn-images-1.medium.com/max/1412/1*XFfR5LbE09_iI5SKUEle4Q.png)

If you look closely, you can see that the `i` parameter in that, matches the one we found in the `k.a` call above, with the url, and str is a url! Now, lets look at obj and result, which will probably both be headers. To make this easier, I’m going to filter out all the `k.a` calls to only ones that have a str starting with “http”.