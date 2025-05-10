
## Reverse Engineering TikTok | Part 1
#### 10/08/2023

--- 

TikTok is one of the largest social media apps currently, so naturally, people were botting and scraping the platform heavily. As a counter, TikTok implemented some security measures that stopped a large amount of the botting. In this series, the goal isn’t to exploit TikTok, but instead to understand the security currently in place.

#### Environment:

- **MemuPlayer (Android 9.0 64 bit):** I’m running an emulator instead of using an actual device, so it’s more controlled, and easier to access it’s data.
- **Frida (16.0.11):** Using this to analyze and inject into TikTok. [https://frida.re/](https://frida.re/)
- **JadX:** Using this to decompile and look at the TikTok code
- **TikTok (31.4.3)**

Starting off, it would be easier to deal with the files if they were on our computer, instead of on the emulator. Using ADB, we can pull the TikTok directory from the emulator to our local directory. This will make it easier to access and manipulate the files.

`adb pull /data/app/com.zhiliaoapp.musically-Clc0LFAhI9VtQbKcBZvICQ== .`

#### Intercepting Traffic:

One part of our goal invovles intercepting and examining the HTTP traffic that TikTok generates while in use. Unlike some other apps, TikTok uses SSL Pinning, a security method to try to make it harder to view the network communication.

Usually I would use mitmproxy, or HTTP Toolkit to intercept and inspect the traffic, but SSL Pinning makes this approach harder. There are ways around it, like changing the APK, or using a frida script to “unpin” the app, but in this case I’m choosing a different way.

We’ll take a more low-level approach by hooking into functions in the code, specifically for HTTP Client and Requests, directly. By doing so, we can have better access to the creation of requests, and data surrounding them.

To start, I used JadX, and opened the `base.apk` located in the TikTok directory I pulled to my device. While most of the classes in the file are random letters, we can see `okhttp3` , which contains a Request class, and is probably what we are looking for:

![](https://cdn-images-1.medium.com/max/1412/1*LXUF6rKLTXYlb_NZQ9Lj6w.png)

We can hook the initialization of the Request class, using the following Frida script, and view the data of the class after it’s set up.

![](https://cdn-images-1.medium.com/max/1412/1*Fs3Sd_6fkxu_pUbGEo0sNg.png)

If we copy the data from a request, and put it into Postman, you can see it executes fine:

![](https://cdn-images-1.medium.com/max/1412/1*jK5-COJpvz26LAPls1yThA.png)

If you look at the headers of the requests, you will notice a bunch of headers starting with “X-”. This is part of TikTok’s security. For every request it will generate headers for that request, and if the headers don’t match up, the server will reject it. For example, if we use these same headers, and change the URL slightly to try and get a different person’s comment section:

![](https://cdn-images-1.medium.com/max/1412/1*5gNocOHFBJbJUZO1PyeZ2Q.png)

So now we can see traffic going out from the app, but we also want to see the data that the app receives. We have to change what we are hooking, because the Request class doesn’t include the response after the Request is executed. There is also no obvious HTTP Client that TikTok is using that we could hook. Instead, I’m going to check the Stack Trace of the calls that resulted in creating a Request object:

![](https://cdn-images-1.medium.com/max/1412/1*XqJD2ZFSSPowsz_l4zZP-g.png)

Here is an example of one of the Stack Traces:

![](https://cdn-images-1.medium.com/max/1412/1*WYIY5aA576NEiO47asJw8Q.png)

There are a couple interesting things about this stack trace. First, it seems like TikTok passes the Request through a bunch of interceptors, before it actually calls the okhttp3.Request object. Looking at the interceptors, it seems like they just look and might modify values in headers or something similar. But, if we look near the end of the trace, (which are the methods that were called first), we can see the first interceptor, `com.bytedance.retrofit2.SsHttpCall.getResponseWithInterceptorChain`, has getResponse, which is what we are looking for. Here is a screenshot of the method, decompiled by JadX:

![](https://cdn-images-1.medium.com/max/1412/1*IybSBQclalq_Pd8UQU7C6g.png)

This function appears to take it’s `originalRequest` variable, and send it down the list of interceptors, which eventually returns that “CWL” type response. CWL doesn’t appear to be a normal HTTP Response type, so let’s check out it’s source: 

![](https://cdn-images-1.medium.com/max/1412/1*t4lk5WkJhMywhKKQwdzatg.png)

Our interceptor method is calling it’s `LIZ` method. Judging by the placement of the Exception’s, the LIZIZ variable seems to be the result we want to hook. 

To bring that last little bit together: We want to hook into `com.bytedance.retrofit2.SsHttpCall` , with the method `getResponseWithInterceptorChain` , which sends a request down through a bunch of interceptors, and returns the result from the request. We will be able to access the Object’s `originalRequest`variable, and view the result from the method, giving us the Request -> Result structure we want. Here is an example of that implemented into a Frida script:  
  

![](https://cdn-images-1.medium.com/max/1412/1*SJseLTcP6iL8vpnTannTHg.png)

And here’s an example of the output:  
  

![](https://cdn-images-1.medium.com/max/1412/1*5fFeFNiLw4_hs3NUJWb_Rw.png)

As you can see, the result structure is still different per request, and we can modify the code depending on which structure is returned to properly format it, but it still shows enough for most of the requests that I don’t think it’s necessary for this. 

Even though we got the Request -> Response working, and we are able to view the HTTP Traffic of the app, there is still a lot left. Like I mentioned earlier, TikTok uses special headers to sign the requests. Because of that, changing any part of the request without matching headers will invalidate them. That means, even though we are able to view the HTTP Traffic from TikTok, we are still not able to modify the traffic, or even create our own requests.

In the next part of this series, I will start working on that. It should cover finding where the headers are added to the request, and where the headers are generated. After that, I should have the ability to choose any URL and Data, and sign it using headers, and it should pass through the server verification. 

  

**Disclaimer:**

The content in this post was not intended for malicious uses or actions, and is for education and research.