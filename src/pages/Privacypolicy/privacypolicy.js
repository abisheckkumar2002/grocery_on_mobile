import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './privacypolicy.css'


import { privacydatas } from '../../Api/privacy';

import  Header  from '../../layouts/Header/header';




export default function Privacypolicy() { 

    const[privacy_policy,setprivacypolicy] = useState("")
   
    const getprivacypolicy = async () => {
   
        var privacy = await privacydatas();
        console.log(privacy,"cpppp")
        
        setprivacypolicy(privacy.privacyyy);
       
        
    }
    useEffect(() => {
        getprivacypolicy()
    }, []);





    return (
        <>

<Header/>
{/* <!-- Privacy Policy Section --> */}

<div className='allbody'>
<section class="privacysection">

    <div class="container">

    <div class="card">

        <h1>
            Privacy <span>Policy</span>
        </h1>
  
        <h4>
            Last Updated: Dec 15, 2022
        </h4>
        <h4>
            I. Introduction and Overview
        </h4>
        <p>
            Thank you for shopping with Grocery On Mobile. We are committed to providing you the best online shopping 
            and delivery experience possible. This Privacy Policy explains what information we (RK FOODS INC d/b/a Grocery On Mobile)
             collect, how that information is used, under what circumstances we share information, and the choices you can make about
              that information. This Privacy Policy applies whether you access the Grocery On Mobile Services (as defined in the Terms
               of Service) through a browser, a mobile application, or any other method.

            This Privacy Policy also describes how we collect, use and disclose your personally identifiable information (“PII”).
             PII is information about you that may be used to identify you (such as your name, phone number, or address)

        </p>
        <h6>
            Additional Disclosures:
        </h6>
        <p>
            We may provide different or additional disclosures relating to the processing of personal information 
            about residents of certain countries, regions or states. 
            Listed below are additional disclosures that may be applicable to you
        </p>
        <div>
            1.	If you are a California resident, please see the additional privacy disclosures below in Disclosure For California Residents<br></br>
            2.	If you are a Nevada resident, please see the additional privacy disclosures below in Disclosure For Nevada Residents
        </div>
        <h4>
            II. Information we collect
        </h4>
        <h6>
            1. Information you provide to us or allow others to provide to us
        </h6>
        <p>
            At various points in the Grocery On Mobile experience, you may provide us with information about yourself. For example, 
            when you create an account through the Services, you provide us with personal information like your name, email address,
             and zip. And if you place an order through the Services, we collect information including your address, phone number,
              credit card information, and the details of your order. Your account information may be updated or corrected by accessing
               your account settings. We do not share your identity with the third parties that we may contact in such a capacity, but
                may share date, time and location of a transaction, which may allow a third party to independently identify you.
            If you log into the Services through a third-party service, both we and that third-party may receive some information about you and
           your use of the services. For example, if you choose to log into the Services with your Facebook account, we may receive information
           from Facebook, such as your name, e-mail address, public profile information, and information about your contacts. We may also offer 
           social sharing tools (such as the Facebook “Like” button) that let you share actions on the Services with other websites and vice 
           versa. In those cases, the providers of those tools may receive information about you when you use those tools. You should check the
           privacy policies of these third-party services and your settings there for more information.
           If you wish to invite your friends and contacts to use the Services, we will give you the option of either entering in their contact
           information manually or, for United States residents, importing it from your address books on other third-party services. In both 
           cases, we will store this information for the sole purposes of allowing you to send your friends referral offers, for determining
           whether your friends use the Services after a referral is sent, and, for United States residents, to remind your friends of the
           referral sent on your behalf.
 
           Our partners may let us collect information about use of their sites/apps or share such information with us. For example,
            if you use an Grocery On Mobile button or widget on another site or app, we may receive information about your use of that
             button or widget and the third-party site/app.

        </p>
        <h6>
            Community Affairs:
        </h6>
        <p>
            When you use the Services, or browse our sites, either through a browser or mobile app, we automatically receive some
             technical information
             about the hardware and software that is being used
        </p>
        <h6>
            Location Information:
        </h6>
        <p>
            When you use the Services, we may collect precise location data. For instance, if you allow the Services to access location 
            services through the permission system used by your device's mobile operating system or browser, we may collect the precise
             location of your device. We use your location information to facilitate the prompt hand-off of pickup orders (where available),
              to assist you in finding nearby stores for which pickup or delivery are available, for other similar purposes and for analytics
               purposes. You can choose whether or not to enable the location tracking feature through the settings on your device or browser,
                or when prompted by Grocery On Mobile
             mobile app. We may also infer your general location information, for example by using your internet protocol (IP) address.
        </p>
        <h4>
            2. Technical information about usage of the Services
        </h4>
        <p>
            When you use the Services, we may collect precise location data. For instance, if you allow the Services to access location services
             through the permission system used by your device's mobile operating system or browser, we may collect the precise location of
              your device. We use your location information to facilitate the prompt hand-off of pickup orders (where available), to assist you
               in finding nearby stores for which pickup or delivery are available, for other similar purposes and for analytics purposes. You 
               can choose whether or not to enable the location tracking feature through the settings on your device or browser, or when
                prompted by Grocery On Mobile mobile app. We may also infer your general location information, for example by using your 
                internet protocol (IP) address.
        </p>
        <h6>
            Cookies, Pixels, and Other Tracking Technologies:
        </h6>
        <p>
            We, our partners, our advertisers, and third-party advertising networks use various technologies to collect information, 
            including but not limited to cookies, pixels, scripts, and device identifiers. Cookies are small text files that are sent by
             your computer when you access our services through a browser. We, our partners, our advertisers, and third-party advertising 
             networks may use session cookies (which expire when you close your browser), persistent cookies (which only expire when you 
             choose to clear them from your browser), pixels, scripts, and other identifiers to collect information from your browser or
              device that helps us do things such as understand how you use our services and other services; personalize your experience;
               measure, manage, and display advertising on the Services or on other services; understand your usage of the Services and other
                services in order to serve customized ads; and remember that you are logged into the Services. Our partners, advertisers, and
                 third-party advertising networks may use these technologies to collect information about your online activity over time and
                  across different websites or online services. By using your browser settings, you may block cookies or adjust settings for
                   notifications when a cookie is set. Your browser settings may allow you to automatically transmit a “Do Not Track” signal
                    to online services you visit. Note, however, there is no industry consensus as to what site and app operators should do
                     with regard to these signals. Accordingly, unless and until the law is interpreted to require us to do so, we do not 
                     monitor or take action with respect to “Do Not Track” signals. For more information on “Do Not
                      Track,”visit http://www.allaboutdnt.com . We employ some third-party services to help us understand the 
                      usage of the Services and the performance of advertising, and these third parties may also deploy cookies,
                       pixels, or other identifiers on the Services or collect information through our mobile applications. For 
                       example, we use Google Analytics to understand, in a non-personally identifying way, how users interact with
                        various portions of the Services -- you can learn more about information that Google may collect here
        </p>
        <h6>
            Log information:
        </h6>
        <p>
            When you use the Services, or browse our sites, our servers will record information about your usage of the Services and 
            information that is sent by your browser or device. Log information can include things like the IP address of your device,
             information about the browser, operating system and/or app you are using, unique device identifiers, pages that you navigate
              to and links that you click, searches that you run on the Services, and other ways you interact with the Services. If you
               are logged into the Services, this information is stored with your account information
        </p>
        <h6>
            Interest-Based or Online Behavioral Advertising:
        </h6>
        <p>
            Grocery On Mobile may use third-party advertising companies to serve interest-based advertisements to you. These
             companies compile information from various online sources (including mobile-enabled browsers and applications) 
             to match you with ads that will be the most relevant, interesting, and timely for you. If you would like to opt
             -out of interest-based advertising, please visit http://optout.networkadvertising.org/#/ . Please note that you
              will be opted out of all interest-based advertising from all business members of the Network Advertising Initiative 
              for that specific browser on that specific device. If you opt-out, you may continue to see Grocery On Mobile’s or our
               partners’ online advertisements; however, these ads will not be as relevant to you
        </p>
        <h6>
            3. Children
        </h6>
        <p>
            Our Services are not intended for children under 13 years of age, and we do not knowingly collect personal information 
            (as defined by the U.S. Children’s Online Privacy Protection Act, or “COPPA”) in a manner not permitted by COPPA. If we 
            obtain actual knowledge that any information we collect has been provided by a child under the age of 13, we will delete
             that information to the extent required by applicable laws. We do not knowingly “sell,” as that term is defined under
              the California Consumer Protect Act (“CCPA”), the personal information of minors under 16 years old who are California 
              residents.
        </p>
        <h4>
            III. How we use your information
        </h4>
        <h6>
            III. How we use your information We may use the information we collect for various purposes, including to:
        </h6>
        <p>
            1.	Provide the Services to you, improve the quality of the service, and develop new products and services<br></br>
            2.	Allow the Delivery Employee/Agent (which means those that deliver the order for you, including our delivery
             partner and their employees/agents where applicable or our third-party providers) to deliver your items purchased 
             by you, and/or call or text you with any updates or issues<br></br>
             3.	Charge you for the delivery costs through one or more payment processing partners<br></br>
            4.	Offer you customized content (including advertising, coupons, and promotions<br></br>
            5.	Understand how users interact with the Services (including advertising both on and off the Services) as a whole and to test new features or changes in our features<br></br>
            6.	Provide customer service, respond to your communications and requests, and contact you about your use of the Services<br></br>
            7.	Send you messages related to our community affairs efforts<br></br>
            8.	Fulfil any other business or commercial purposes at your direction or with prior notice to you and your consent<br></br>
            

        </p>
        <h6>
            This Privacy Policy applies in addition to the terms and conditions of our Site
        </h6>
        <h4>
            Consent
        </h4>
        <h6>
            By using our Site users agree that they consent to:
        </h6>
        <p>
            1.	The conditions set out in this Privacy Policy; and<br></br>
            2.	The collection, use, and retention of the data listed in this Privacy Policy.

        </p>
        <h4>
            Personal Data We Collect
        </h4>
        <p>
            We only collect data that helps us achieve the purpose set out in this Privacy Policy. We will not collect any additional
             data beyond the data listed below without notifying you first.
        </p>
        <h4>
            Data Collected in a Non-Automatic Way
        </h4>
        <h6>
            We may also collect the following data when you perform certain functions on our Site:
        </h6>
        <p>
            1.	First and last name;<br></br>
            2.	Email address;<br></br>
            3.	Phone number;<br></br>
            4.	Address;<br></br>
            5.	Payment information; and<br></br>
            6.	Auto fill data.

        </p>
        <h6>
            This data may be collected using the following methods:
        </h6>
        <p>
            1.	Signing with our website or Mobile App; and<br></br>
            2.	Placing the order in our Website or Mobile App.

        </p>
        <h4>
            How We Use Personal Data
        </h4>
        <p>
            Data collected on our Site will only be used for the purposes specified in this Privacy Policy or indicated on the
             relevant pages of our Site. We will not use your data beyond what we disclose in this Privacy Policy.<br></br>

             The data we collect when the user performs certain functions may be used for the following purposes:<br></br>
             1.	Delivery of the order

        </p>
        <h4>
            Who We Share Personal Data With Employees
        </h4>
        <p>
            We may disclose user data to any member of our organization who reasonably needs access to user data to achieve the purposes
             set out in this Privacy Policy.<br></br>
             1.	If the law requires it;<br></br>
             2.	If it is required for any legal proceeding;<br></br>
             3.	To prove or protect our legal rights; and<br></br>
             4.	To buyers or potential buyers of this company in the event that we seek to sell the company.<br></br>
           If you follow hyperlinks from our Site to another Site, please note that we are not responsible for and have no 
           control over their privacy policies and practices

        </p>
        <h4>
            How Long We Store Personal Data
        </h4>
        <p>
            User data will be stored until the purpose the data was collected for has been achieved.<br></br>
            You will be notified if your data is kept for longer than this period.

        </p>
        <h4>
            How We Protect Your Personal Data
        </h4>
        <p>
            In order to protect your security, we use the strongest available browser encryption and store all of our
             data on servers WITH SSL CERTIFICATE. All data is only accessible to our employees & agents. Our employees & 
             agents are bound by strict confidentiality agreements and a breach of this agreement would result in the 
             employee's & agent's termination.<br></br>
             While we take all reasonable precautions to ensure that user data is secure and that users are protected,
              there always remains the risk of harm. The Internet as a whole can be insecure at times and therefore
               we are unable to guarantee the security of user data beyond what is reasonably practical.
        </p>
        <h4>
            Children
        </h4>
        <p>
            The minimum age to use our website is 18 years of age. We do not knowingly collect or use personal data
             from children under 13 years of age. If we learn that we have collected personal data from a child under
              13 years of age, the personal data will be deleted as soon as possible. If a child under 13 years of age
               has provided us with personal data their parent or guardian may contact our privacy officer.
        </p>
        <h4>
            How to Access, Modify, Delete, or Challenge the Data Collected
        </h4>
        <p>
            If you would like to know if we have collected your personal data, how we have used your personal data,
             if we have disclosed your personal data and to who we disclosed your personal data, or if you would like
              your data to be deleted or modified in any way, please contact our privacy officer here:<br></br>
              Raj Pant<br></br>
              cs@groceryonmobile.com<br></br>
              (866) 868-8365<br></br>
              1327 Ashton Road, STE 3, Hanover, MD 21076

        </p>
        <h4>
            Do Not Track Notice
        </h4>
        <p>
            Do Not Track ("DNT") is a privacy preference that you can set in certain web browsers. We do not track the 
            users of our Site over time and across third party websites and therefore do not respond to browser-initiated DNT signals.
        </p>
        <h4>
            How to Opt-Out of Data Collection, Use or Disclosure
        </h4>
        <p>
            In addition to the method(s) described in the How to Access, Modify, Delete, or Challenge the Data Collected section,
             we provide the following specific opt-out methods for the forms of collection, use, or disclosure of your personal
              data specified below:<br></br>
              1.	Customer can opt out of the use of their personal data for marketing emails. You can opt-out by reply "Stop"
        </p>
        <h4>
            Cookie Policy
        </h4>
        <p>
            A cookie is a small file, stored on a user's hard drive by a website. Its purpose is to collect data relating to the 
            user's browsing habits. You can choose to be notified each time a cookie is transmitted. You can also choose to disable
             cookies entirely in your internet browser, but this may decrease the quality of your user experience.<br></br>
             We use the following types of cookies on our Site:
        </p>
        <h4>
            1.	Functional cookies
        </h4>
        <p>
            Functional cookies are used to remember the selections you make on our Site so that your selections are saved for
             your next visits; and
        </p>
        <h4>
            2.	Targeting cookies
        </h4>
        <p>
            Targeting cookies collect data on how you use the Site and your preferences. This allows us to personalize 
            the information you see on our Site for you.
        </p>
        <h4>
            Modifications
        </h4>
        <p>
            This Privacy Policy may be amended from time to time in order to maintain compliance with the law and to reflect 
            any changes to our data collection process. When we amend this Privacy Policy we will update the "Effective Date" a
            t the top of this Privacy Policy. We recommend that our users periodically review our Privacy Policy to ensure that
             they are notified of any updates. If necessary, we may notify users by email of changes to this Privacy Policy
        </p>
        <h4>
            Contact Information
        </h4>
        <p>
            If you have any questions, concerns or complaints, you can contact our privacy officer, Admin, at:<br></br>
            cs@groceryonmobile.com<br></br>
            (866) 868-8365<br></br>

            337 HOSPITAL DR<br></br>
            STE T<br></br>
            GLEN BURNIE, MD 21061<br></br>

        </p>
    </div>


<div>
{/* <p>{privacy_policy}</p> */}
</div>


    </div>

</section>
{/* <!-- Privacy Policy Section Ends --> */}


</div>







</>

);
}