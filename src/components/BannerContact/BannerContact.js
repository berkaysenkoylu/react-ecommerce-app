import React from 'react';

import classes from './BannerContact.module.scss';
import ContactElement from './ContactElement/ContactElement';

const BannerContact = (props) => {
    let contacts = [
        {
            contactTitle: "Free Shipping",
            contactPar: "When you spend $25+",
            contactIcon: "truck"
        },
        {
            contactTitle: "Call Us Anytime",
            contactPar: "+9 0(666) 666 66 66",
            contactIcon: "mobile"
        },
        {
            contactTitle: "Chat With Us",
            contactPar: "24-hour chat support",
            contactIcon: "chat"
        },
        {
            contactTitle: "Gift Cards",
            contactPar: "For any amount",
            contactIcon: "gift"
        }
    ];

    let pageContent = contacts.map(contact => {
        return <ContactElement key={contact.contactTitle} contactTitle={contact.contactTitle} contactPar={contact.contactPar} iconName={contact.contactIcon} />;
    });

    return (
        <div className={classes.BannerContact}>
            {pageContent}
        </div>
    )
}

export default BannerContact;