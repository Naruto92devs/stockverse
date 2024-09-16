'use client';
import './form.css';
import React, { useState } from 'react';

const Form = () => {
  // State to hold form input values
const [formData, setFormData] = useState({
email: '',
customPhoneNumber: '',  // Updated state key
customPrivacy: false,
});

// Map input names to state keys
const nameToStateKey = {
email: 'email',
'custom Phone Number': 'customPhoneNumber',
'custom privacy': 'customPrivacy',
};

// Handle input changes
const handleChange = (e) => {
const { name, value, type, checked } = e.target;
const stateKey = nameToStateKey[name]; // Map the input name to state key

setFormData((prevData) => ({
    ...prevData,
    [stateKey]: type === 'checkbox' ? checked : value,
}));
};

return (
<div>
    <form
    method="post"
    className="af-form-wrapper"
    acceptCharset="UTF-8"
    action="https://www.aweber.com/scripts/addlead.pl"
    >
    <div style={{ display: 'none' }}>
        <input type="hidden" name="meta_web_form_id" value="954193347" />
        <input type="hidden" name="meta_split_id" value="" />
        <input type="hidden" name="listname" value="awlist6812888" />
        <input
        type="hidden"
        name="redirect"
        value="https://top.stockverse.ai/cvkd/"
        id="redirect_765e453bf63038bb0ca1358b6978a2af"
        />

        <input type="hidden" name="meta_adtracking" value="Stockverse_Alerts" />
        <input type="hidden" name="meta_message" value="1" />
        <input type="hidden" name="meta_required" value="email,custom Phone Number,custom privacy" />
        <input type="hidden" name="meta_forward_vars" value="True" />
        <input type="hidden" name="meta_tooltip" value="" />
    </div>
    <div id="af-form-954193347" className="af-form">
        <div id="af-body-954193347" className="af-body af-standards">
        <div className="af-element">
            <label className="previewLabel" htmlFor="awf_field-117565556">
            Email:
            </label>
            <div className="af-textWrap">
            <input
                className="text"
                id="awf_field-117565556"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                tabIndex="500"
            />
            </div>
            <div className="af-clear"></div>
        </div>
        <div className="af-element">
            <label className="previewLabel" htmlFor="awf_field-117565557">
            Phone Number:
            </label>
            <div className="af-textWrap">
            <input
                type="text"
                id="awf_field-117565557"
                className="text"
                autoComplete="tel"
                name="custom Phone Number"  // Ensure this matches AWeber's required field name
                value={formData.customPhoneNumber}
                onChange={handleChange}
                tabIndex="501"
            />
            </div>
            <div className="af-clear"></div>
        </div>
        <div className="af-element af-element-checkbox">
            <div className="af-checkWrap">
            <input
                type="checkbox"
                value="yes"
                id="awf_field-117565558"
                className="checkbox"
                name="custom privacy"  // Ensure this matches AWeber's required field name
                checked={formData.customPrivacy}
                onChange={handleChange}
                autoComplete="on"
                tabIndex="502"
            />
            <label className="choice" htmlFor="awf_field-117565558">
                I agree to receive SMS based on my data.
            </label>
            <input type="hidden" name="tagif_custom privacy" value="" />
            </div>
            <div className="af-clear"></div>
        </div>
        <div className="af-element buttonContainer">
            <input
            name="submit"
            className="submit"
            type="submit"
            value="Continue to Stock Name >"
            tabIndex="503"
            />
            <div className="af-clear"></div>
        </div>
        <div className="af-element privacyPolicy" style={{ textAlign: 'center' }}>
            <p>
            We respect your{' '}
            <a
                title="Privacy Policy"
                href="https://www.aweber.com/permission.htm"
                target="_blank"
                rel="nofollow"
            >
                email privacy
            </a>
            </p>
            <div className="af-clear"></div>
        </div>
        </div>
    </div>
    <div style={{ display: 'none' }}>
        <img src="https://forms.aweber.com/form/displays.htm?id=nKwsjJzMzCzs" alt="" />
    </div>
    </form>
</div>
);
};

export default Form;