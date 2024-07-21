import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './termsandconditions.css'

import { termsdatas } from '../../Api/terms';

import { useNavigate, useParams } from "react-router-dom";

import  Header  from '../../layouts/Header/header';

import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

export default function Termsandconditions() { 

    useEffect(() => {
        getterms()
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const history = useNavigate();
    const[termss,setterms] = useState("")
   
    const getterms = async () => {
   
        var term = await termsdatas();
        console.log(term,"ccdd")
        
        setterms(term.termss);
       
        
    }
   



    return (
        <>


{/* 
<!-- Terms & Condition Section --> */}




<Header/>


<div className='allbody'>

<section class="privacysection">
    <div class="container">

    <Button onClick={() => history(-1)} variant="primary"><BsFillArrowLeftCircleFill style={{ fontSize: "18px", marginTop: "-3px" }} /> Back</Button>


        <div class="card" style={{ marginTop:"10px" }}>
        <h1>
            Terms & <span>Conditions</span>
        </h1>

        <p>
            These Terms of Service (“Terms& Conditions”) govern your use of the Grocery On Mobile services, including
             Grocery On Mobile ’s website, Grocery On Mobile ’s mobile applications, and any websites (or portions thereof) 
             or mobile applications that are operated by Grocery On Mobile (collectively, the “Services”), and are entered
              into by you and RK Foods Inc dba Grocery On Mobile, a Maryland corporation (“Grocery On Mobile ”). By using
               the Services, you agree to be bound by these Terms and acknowledge and agree to the collection, use and 
               disclosure of your personal information in accordance with Grocery On Mobile’s Privacy Policy.</p>
               <p>
               “Disputes & Arbitration” of these terms provide that any claims that you and grocery on mobile have against each other,
                including, without limitation, any claims that arose or were asserted before the effective date of these terms, will
                , with limited exceptions, be submitted to binding and final arbitration. unless you opt out of the arbitration agreement
                 you will only be permitted to pursue claims and seek relief against grocery on mobile on an individual basis, not as a 
                 plaintiff or class member in any class or representative action or proceeding. you also waive your right to seek relief 
                 in a court of law and to have a jury trial on your claims. please seesection 8 for more information regarding this arbitration 
                 agreement, the possible effects of this arbitration agreement, and how to opt out of the arbitration agreement.</p>
                 <p>
                     The Services comprise a platform that presents you to select goods for picking, packing, and delivery
                      by individual Delivery Associate (“Delivery Associate”) to your location or, if available, for you to pick
                       up in-store. Picking, packing, or delivery services may be performed by third parties including a retailer 
                       or third party logistics provider (collectively, “Third Party Providers”).</p>
                       <p>
                       Delivery may be conducted by each Delivery Associate select method of transportation. You acknowledge that
                        transportation or logistics services are provided by third party independent contractors who are not employed
                         by Grocery On Mobile .</p>
                         <p>
            When you use the Services to place an order for products, you authorize the purchase and delivery of those products
             selected by you. Unless otherwise specified, you acknowledge and agree that Grocery On Mobile and the Delivery Associate
              are acting as your agents in the picking, packing, and/or delivery of goods purchased by you and are not the seller of
               the goods to you. You agree that your purchase is being made from the retailer/website/Mobile App you have selected,
                that retailer is the merchant of record, and that title to any goods passes to you when they are purchased at the
                 applicable retailer’s store. You agree that Grocery On Mobile or the applicable retailer will obtain a credit
                  card authorization for your credit card on file with Grocery On Mobile to cover the cost of the goods you
                   have purchased from the retailer and any separate Grocery On Mobile fees, and your card will be charged
                    for the goods purchased by you and any applicable fees, taxes and/or tips. Your card may be temporarily
                     authorized for an amount greater than the total amount of the purchase appearing in the original check out
                     . This higher authorized amount will be disclosed during the purchase process and is a temporary authorization
                      charge on your order, to deal with situations where your total purchase amount turns out to be higher than
                       the original amount due to special requests, added items, replacement items or weight adjustments.</p>
                       <p>
                       You also acknowledge and agree that, except as expressly provided for otherwise in these Terms or a separate
                        agreement between you and Grocery On Mobile , Grocery On Mobile does not form any employment or agency
                         relationship with you and does not hold title to any goods that you order through the Services.</p>
                         <p>
                         Unless otherwise indicated, all prices and other amounts are in the US Dollar.<br></br>
                         Occasionally there may be information on the Services that contains typographical errors, inaccuracies, 
                         or omissions that may relate to pricing, product descriptions, promotions offer, and availability. 
                         Grocery On Mobile reserves the right to correct any errors, inaccuracies or omissions and to change 
                         or update information or refuse or cancel orders if any information on the Services is inaccurate at 
                         any time without prior notice (including after you have submitted your order and/or your credit card 
                         has been charged). Please note that prices of products on the Services may be different than prices 
                         offered for the same products in-store by the same retailer.
        </p>
        <h4>
            1. Your Use of the Services
        </h4>
        <p>
            Grocery OnMobile grants you a limited, non-exclusive, non-transferable, and revocable license to use the Services 
            for their intended purposes subject to your compliance with these Terms and Grocery On Mobile ’s policies. 
            You may not copy, modify, distribute, sell, or lease any part of the Services. Unless such restriction is 
            prohibited by law or you have Grocery On Mobile ’s written permission, you may not reverse engineer or 
            attempt to extract the source code of the Services. You may only access the Services through the interfaces 
            that Grocery On Mobile provides for that purpose (for example, you may not “scrape” the Services through 
            automated means or “frame” any part of the Services), and you may not interfere or attempt to disrupt the 
            Services. Some parts of the Services may allow you to upload or submit content (such as text, images, video, 
            recipes, lists, links, and other materials). You retain all rights in any content that you upload or submit 
            and are solely responsible for that content. You grant Grocery On Mobile a non-exclusive, royalty-free, 
            worldwide, transferable, sub-licensablelicense to use, store, publicly display, publicly perform, reproduce, 
            modify, create derivative works from, and distribute any such content for the purposes of operating, 
            providing, and improving the Services. Grocery On Mobile may, in its sole discretion, remove or take down 
            any content that you upload or submit to the Services for any reason, including violation of these Terms 
            or any other policies. You may have the option of accessing the Services through downloadable software and 
            this software may update itself automatically on your device. Some software, or portions of software, in the 
            Services may be governed by open source licenses. In that case, Grocery On Mobile will make such licenses 
            available to you and, in the case of conflict between such a license and these Terms, the open source license 
            will control but only with respect to the software, or portion of the software, to which it applies. If you are 
            using Grocery On Mobile on behalf of a business or other entity, you represent and warrant that you have the 
            necessary authority to bind that business or entity to these Terms and that you are agreeing to these Terms on 
            behalf of that business or entity. In order to use the Services, you may need to create a user account. You agree 
            that you are responsible for all conduct and transactions that take place on or using your account and that you 
            will take precautions to keep your password and other account information secure. You also agree that you will 
            comply with all applicable laws when accessing or using the Services and you will respect those who you encounter 
            in your use of the Services, including Employee/s, Delivery Associate and individuals who support Grocery On Mobile. 
            Grocery On Mobile reserves the right to decline orders, refuse partial or full delivery, terminate accounts, and/or 
            cancel orders at any time in its sole discretion. We’re constantly modifying and improving the Services. Grocery On 
            Mobile may introduce new features, change existing features, or remove features from the Services at any time and 
            without notice. If you provide Grocery On Mobile with any feedback on or comments regarding the Services, you grant 
            Grocery On Mobile the right to use such feedback or comments for any purpose without restriction or payment to you. 
            If you have any requests for order cancellations, refunds, or returns, please visit your account to initiate such 
            requests or review our Support Center articles for our policies regarding the same.
        </p>
        <h4>
            2. Grocery On Mobile Communications
        </h4>
        <p>
            By creating an Grocery On Mobile user account, you agree to accept and receive communications from 
            Grocery On Mobile or Delivery Associate, including via email, text message, calls, and push 
            notifications to the cellular telephone number you provided to Grocery On Mobile. You understand 
            and agree that you may receive communications generated by automatic telephone dialling systems 
            and/or which will deliver pre-recorded messages sent by or on behalf of Grocery On Mobile , its 
            affiliated companies, employee/s and/or Delivery Associate, including but not limited to communications 
            concerning orders placed through your account on the Services. Message and data rates may apply. If you 
            do not wish to receive promotional emails, text messages, or other communications, you may opt out of 
            such communications at any time in Your Account Settings. You may also opt-out of receiving text messages 
            from Grocery On Mobile by replying “STOP” from the mobile device receiving the messages.
        </p>
        <h4>
            3. Grocery On Mobile Coupons
        </h4>
        <p>
            Grocery On Mobile Coupons are promotional coupons that are automatically applied to qualifying products 
            upon purchase to help users save money on the products they love or the tips you paid for the Delivery 
            Associate at the time of the online purchase. Coupons are available for a limited time only and may be 
            subject to certain restrictions. Coupons are subject to change, cancellation, or expiration at any time. 
            If you do not purchase the qualifying items added to your cart while the Coupon is still in effect, the 
            Coupon’s offer will not apply. Coupons apply only to qualifying items displaying the offer and may not be 
            combined with other promotional offers or mail-in rebates. Coupons are issued and paid by Grocery On Mobile 
            or the manufacturer of the advertised product. The user is required to pay any applicable sales tax related 
            to use of the Coupon; you acknowledge that Grocery On Mobile has no obligation for payment of any tax in 
            conjunction with the distribution or use of such Coupons. When Coupons are redeemed, sales tax may be charged 
            on the undiscounted original price of the product(s). Coupons may not be sold, copied, modified, or transferred. 
            A Coupon has no cash value. Coupons good while supplies last. Void where restricted or prohibited by law.
        </p>
        <h4>
            4. Third-party Products and Content
        </h4>
        <p>
            You agree that Grocery On Mobile does not assume responsibility for any products, content, services, websites, 
            advertisements, offers, or information that is provided by third parties and made available through the Services. 
            If you purchase, use, or access any such products, content, services, advertisements, offers, or information 
            through the Services, you agree that you do so at your own risk and that Grocery On Mobile will have no liability 
            based on such purchase, use, or access.
        </p>
        <h4>
            5. SERVICE PROVIDED AS-IS AND RELEASE OF CLAIMS
        </h4>
        <p> The Services are provided "as is" and "as available." to the maximum extent permitted by applicable law, grocery on mobile disclaims all representations, conditions, and warranties, express, legal, implied, or statutory, including the implied warranties or conditions of merchantability, quality, fitness for a particular purpose, durability, title, and non-infringement. in addition, to the maximum extent permitted by applicable law, grocery on mobile makes no representation, warranty, conditions, or guarantee regarding the reliability, timeliness, quality, suitability, or availability of the services, any services provided by delivery associate or third party providers, or goods requested through the use of the services from retailers, or that the services will be uninterrupted or error-free. grocery on mobile does not guarantee the quality, suitability, safety or ability of delivery associate, third party providers, or retailers. you agree that the entire risk arising out of your use of the services, any services provided by delivery associate or third party providers, or any products requested by you or delivered to you, remains solely with you.
            to the maximum extent permitted by applicable law, you agree that neither grocery on mobile nor its affiliates, retail partners, licensors, or suppliers is responsible for the fitness or conduct of any delivery associate or third party provider or for any services provided by any delivery associate or third party provider. neither grocery on mobile nor its affiliates, retail partners, licensors, or suppliers will be liable for any claim, injury or damage arising in connection with the acts or omissions of any delivery associate or third party provider.

            If you have a dispute with one or more Delivery Associate or Third Party Providers, you agree to release Grocery On Mobile (including Grocery On Mobile ’s affiliates, and each of their respective officers, directors, employees, agents, shareholders, retail partners, licensors, and suppliers) from any claims, demands and damages of every kind and nature, known and unknown, suspected and unsuspected, disclosed and undisclosed, arising out of or in any way connected to such disputes.
            Furthermore, you expressly waive any rights you may have under Maryland Civil Code (or analogous laws of other jurisdictions), which states: “A general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release, and that, if known by him or her must, would have materially affected his or her settlement with the debtor or released party.”

        </p>
        <h4>
            6. LIMITATION OF LIABILITY
        </h4>
        <p>
            This provision applies to the maximum extent permitted by applicable law<br></br>
            in no event shall grocery on mobile (including its affiliates, and each of their respective officers, directors, employees, 
            agents, shareholders, retail partners, licensors, and suppliers) be liable to you for any incidental, special, punitive, 
            consequential, or indirect damages (including, but not limited to, damages for deletion, corruption, loss of data, loss of 
            programs, failure to store any information or other content maintained or transmitted by the services, service interruptions, 
            or for the cost of procurement of substitute services) arising out of or in connection with the services, or these terms, however 
            arising including negligence, even if grocery on mobile or grocery on mobile ’s agents or representatives know or have been advised 
            of the possibility of such damages. in no event shall grocery on mobile (including its affiliates, and each of their respective 
            officers, directors, employees, agents, shareholders, retail partners, licensors, and suppliers) be liable for any indirect, 
            special, punitive, incidental, exemplary and/or consequential damages (including, but not limited to physical damages, bodily 
            injury, death and/or emotional distress and discomfort) arising out of your use of the services, any services provided by delivery 
            associate or third party providers, or any products requested by you or delivered to you, even if grocery on mobile or grocery on 
            mobile ’s agents or representatives know or have been advised of the possibility of such damages. grocery on mobile , its affiliates, 
            retail partners, licensors, suppliers and distributors will not be liable for aggregate liability for all claims relating to the 
            services, any services provided by delivery associate or third party providers, or any products requested by you or delivered to 
            you for more than the greater of $100 or the amounts paid by you to grocery on mobile for the past 12 months of the services.
            
            


        </p>
        <h4>
            7. Indemnification
        </h4>
        <p>
            You agree to defend, indemnify and hold harmless Grocery On Mobile and its officers, directors, employees, agents, shareholders, 
            affiliates, and retail partners (each, an "Indemnified Party") from and against any losses, claims, actions, costs, damages, 
            penalties, fines and expenses, including without limitation attorneys’ and experts’ fees and expenses, that may be incurred by 
            an Indemnified Party arising out of, relating to or resulting from your unauthorized use of the Services or from any breach by 
            you of these Terms, including without limitation any actual or alleged violation of any law, rule or regulation.


        </p>
        <h4>
            8. Disputes&Arbitration
        </h4>
        <p>
            In the event the parties are not able to resolve any dispute between them arising out of or concerning these Terms and Conditions, 
            or any provisions hereof, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then such 
            dispute shall be resolved only by final and binding arbitration pursuant to the Federal Arbitration Act, conducted by a single 
            neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the 
            parties, in a location mutually agreed upon by the parties. The arbitrator's award shall be final, and judgment may be entered 
            upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding or arbitration arises out 
            of or concerns these Terms and Conditions, the prevailing party shall be entitled to recover its costs and reasonable attorney's 
            fees. The parties agree to arbitrate all disputes and claims in regards to these Terms and Conditions or any disputes arising as a 
            result of these Terms and Conditions, whether directly or indirectly, including Tort claims that are a result of these Terms and 
            Conditions. The parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The 
            entire dispute, including the scope and enforceability of this arbitration provision, shall be determined by the Arbitrator. 
            This arbitration provision shall survive the termination of these Terms and Conditions.

        </p>
        <h4>
            9. Class Action Waiver
        </h4>
        <p>
            Any arbitration under these Terms and Conditions will take place on an individual basis; class arbitrations and 
            class/representative/collective actions are not permitted. the parties agree that a party may bring claims against the 
            other only in each's individual capacity, and not as a plaintiff or class member in any putative class, collective and/ 
            or representative proceeding, such as in the form of a private attorney general action against the other. further, unless 
            both you and grocery on mobile agree otherwise
            the arbitrator may not consolidate more than one person's claims, and may 
            not otherwise preside over any form of a representative or class proceeding.

        </p>
        <h4>
            10. Termination
        </h4>
        <p>
            You can stop using the Services at any time and without notice to us. Similarly, Grocery On Mobile may terminate access to the 
            Services to you or any other users or stop offering the all or part of the Services at any time without notice. In the event of 
            Termination, Section 1 and Sections 4-16 survive and continue to apply to you.

        </p>
        <h4>
            11. Controlling Law
        </h4>
        <p>
            To the extent permitted by applicable law, these Terms will be governed by the laws of the State of Maryland for residents of the 
            United States, without respect to its conflicts of laws principles. To the extent permitted by applicable law, any claims arising 
            out of or relating to these Terms or use of the Services that are not subject to Section 8 (Disputes& Arbitration) of these Terms 
            shall be brought exclusively in the federal or state courts of Anne Arundel County, Maryland, USA, for the residents of the United 
            States, and you and Grocery On Mobile consent to the personal jurisdiction of those courts.

        </p>
        <h4>
            12. Entire Agreement & Severability
        </h4>
        <p>
            These Terms, subject to any amendments, modifications, or additional agreements you enter into with Grocery On Mobile , shall 
            constitute the entire agreement between you and Grocery On Mobile with respect to the Services and any use of the Services. If 
            any provision of these Terms is found to be invalid by a court competent jurisdiction, that provision only will be limited to the 
            minimum extent necessary and the remaining provisions will remain in full force and effect.

        </p>
        <h4>
            13. No Waiver
        </h4>
        <p>
            Grocery On Mobile ’s failure to monitor or enforce a provision of these Terms does not constitute a waiver of its right to do so in 
            the future with respect to that provision, any other provision, or these Terms as a whole.

        </p>
        <h4>
            14. Assignment
        </h4>
        <p>
            You may not assign any of your rights, licenses, or obligations under these Terms. Any such attempt at assignment by you shall be 
            void. Grocery On Mobile may assign its rights, licenses, and obligations under these Terms without limitation.

        </p>
        <h4>
            15. Changes to the Terms
        </h4>
        <p>
            We may make changes to these Terms from time to time. When Grocery On Mobile does so, Grocery On Mobile will post the most current 
            version of the Terms on Grocery On Mobile ’s website and, if a revision to the Terms is material, Grocery On Mobile will notify 
            you of the new Terms (for example, by email or a notification on the Services). Changes to these terms will not apply 
            retroactively. If you do not agree to the modified terms, you should discontinue your use of the Services.

        </p>
        <h4>
            16. Copyright and Trademark Policy
        </h4>
        <p>
            Grocery On Mobile respects the intellectual property rights of others and has implemented a copyright and trademark policy 
            in accordance with the Digital Millennium Copyright Act and other relevant laws. Grocery On Mobile will respond to valid 
            notices of copyright infringement and reserves the right to terminate any users, at Grocery On Mobile ’s sole discretion 
            and without notice, who repeatedly infringe copyrights or other intellectual property rights.
            If you believe any content posted or made available on the Services constitutes infringement of your copyright rights, 
            you may send a written notice of infringement to Grocery On Mobile ’s designated Copyright Agent using the contact 
            information listed below. In your notice, please specify the nature of the copyright infringement and include the following 
            information: (a) an electronic or physical signature of the owner of the copyright in question or a person authorized to act 
            on behalf of the owner of the copyright; (b) a description of the claimed infringing material as well as identification of 
            the claimed infringing material, including the location of such material on the Services (e.g., the URL of the claimed 
            infringing material if applicable or other means by which Grocery On Mobile may locate the material); (c) complete contact 
            information, including the name of the owner of the copyright and your name, title, address, telephone number, and email 
            address; (d) a statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, 
            its agent, or the law; and (e) a statement, made under penalty of perjury, that the information provided in your notice is 
            accurate and that you are the copyright owner or authorized to act on behalf of the owner.<br></br>
            Grocery On Mobile<br></br>
            ATTN: Copyright Agent<br></br>
            337 Hospital Dr<br></br>
            STE T<br></br>
            Glen Burnie, MD 21061<br></br>
            CS@GROCERYONMOBILE.COM<br></br>
            You believe any content posted or made available on the Services constitutes infringement of your trademark rights, you may also 
            send your notice to Grocery On Mobile 's designated Copyright Agent using the contact information listed above. Please include as 
            much detail as possible so that we may respond to your notice in a timely manner, including but not limited to description(s) of 
            your trademark(s), your trademark registration number(s), description(s) of the products allegedly using your trademark(s) without 
            authorization, and the location of such allegedly infringing product(s).

            
        </p>
        <h4>
            17. Contact Information
        </h4>
        <p>
            If you have any questions, or comments about these Terms please contact Grocery On Mobile at:<br></br>
            Grocery On Mobile,<br></br>
            337 Hospital Dr<br></br>
            STE T<br></br>
            Glen Burnie, MD 21061<br></br>
            For customer service inquiries, please review Your Account Settings, visit Grocery On Mobile ’ <br></br>
            Contact Us page or call our 
            support team at +1(866)868-8365.

        </p>


{/* <p>{termss}</p> */}

    </div>
    </div>

</section>
</div>
{/* <!-- Terms & Condition Section Ends --> */}









</>

);
}