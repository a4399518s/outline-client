/*
  Copyright 2020 The Super Net Authors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
/* begin: dropdown menu dependencies */
/* Ensure Web Animations polyfill is loaded since neon-animation 2.0 doesn't import it */
/* ref: https://github.com/PolymerElements/paper-dropdown-menu/#changes-in-20 */
/* end: dropdown menu dependencies */

import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style>
      :host {
        background: #efefef;
        text-align: center;
        width: 100%;
        padding: 0 8px;
      }
      :host a {
        color: #009688;
      }
      paper-card {
        display: block;
        text-align: left;
        margin: 8px auto;
        max-width: 550px;
      }
      paper-input,
      paper-textarea,
      paper-dropdown-menu {
        text-align: left;
        --paper-input-container-focus-color: #009688;
      }
      paper-dropdown-menu {
        width: 100%;
      }
      paper-item:not([disabled]) {
        cursor: pointer;
      }
      .card-actions {
        text-align: right;
      }
      #submitButton {
        margin: 0;
      }
      .info {
        font-weight: 300;
        font-size: 12px;
        color: #999;
        line-height: 125%;
        text-align: left;
      }
    </style>
    <paper-card>
      <div class="card-content">
        <paper-dropdown-menu id="dropdownMenu" horizontal-align="left" no-label-float="" required="">
          <paper-listbox id="categoryList" selected="{{category}}" attr-for-selected="value" slot="dropdown-content">
            <paper-item value="general">[[localize('feedback-general')]]</paper-item>
            <paper-item value="no-server">[[localize('feedback-no-server')]]</paper-item>
            <paper-item value="cannot-add-server">[[localize('feedback-cannot-add-server')]]</paper-item>
            <paper-item value="connection">[[localize('feedback-connection')]]</paper-item>
            <paper-item value="performance">[[localize('feedback-performance')]]</paper-item>
            <paper-item value="suggestion">[[localize('feedback-suggestion')]]</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input
          id="email"
          type="email"
          name="email"
          label="[[localize('email-feedback-input')]]"
          on-value-changed="_emailValueChanged"
          onkeydown="this.invalid = false;"
        ></paper-input>
        <p class="info" hidden$="[[!shouldShowLanguageDisclaimer]]">[[localize('feedback-language-disclaimer')]]</p>

        <paper-textarea
          id="feedback"
          name="feedback"
          label="[[localize('feedback-input')]]"
          rows="3"
          onkeydown="this.invalid = false;"
          required=""
        ></paper-textarea>

        <p
          class="info"
          inner-h-t-m-l="[[localize('feedback-privacy', 'privacyPolicyLinkOpen', '<a href=https://support.getoutline.org/s/article/Data-collection>', 'privacyPolicyLinkClose', '</a>')]]"
        ></p>
      </div>
      <div class="card-actions">
        <paper-button id="submitButton" disabled$="[[submitting]]">[[submitButtonLabel]]</paper-button>
      </div>
    </paper-card>
  `,

  is: 'feedback-view',

  properties: {
    // Need to declare localize function passed in from parent, or else
    // localize() calls within the template won't be updated
    localize: Function,
    category: {
      type: String,
      value: 'general',
    },
    hasEnteredEmail: {
      type: Boolean,
      value: false,
    },
    shouldShowLanguageDisclaimer: {
      type: Boolean,
      computed: '_computeShouldShowLanguageDisclaimer(hasEnteredEmail)',
    },
    submitting: {
      type: Boolean,
      value: false,
    },
    submitButtonLabel: {
      type: String,
      computed: '_computeSubmitButtonLabel(submitting, localize)',
    },
  },

  ready: function() {
    var appRoot = dom(this).getOwnerRoot().host;
    window.addEventListener(
      'location-changed',
      function() {
        if (appRoot.page !== 'feedback') return;
        // Workaround:
        // https://github.com/PolymerElements/paper-dropdown-menu/issues/159#issuecomment-229958448
        if (!this.$.dropdownMenu.value) {
          var tmp = this.$.categoryList.selected;
          this.$.categoryList.selected = undefined;
          this.$.categoryList.selected = tmp;
        }
      }.bind(this)
    );
  },

  _emailValueChanged: function() {
    this.hasEnteredEmail = !!this.$.email.value;
  },

  _computeSubmitButtonLabel: function(submitting, localize) {
    // If localize hasn't been defined yet, just return '' for now - Polymer will call this
    // again once localize has been defined at which point we will return the right value.
    if (!localize) return '';
    var label = submitting ? 'submitting' : 'submit';
    return this.localize(label);
  },

  // Returns whether the window's locale is English (i.e. EN, en-US) and the user has
  // entered their email address.
  _computeShouldShowLanguageDisclaimer: function(hasEnteredEmail) {
    return !window.navigator.language.match(/^en/i) && hasEnteredEmail;
  },

  getValidatedFormData: function() {
    var inputs = [this.$.categoryList, this.$.feedback, this.$.email];
    for (var i = 0, input = inputs[i]; input; input = inputs[++i]) {
      if (input.validate && !input.validate()) {
        // The input.validate() call gives the input "invalid" styles if it's invalid,
        // so the user can see they have to fix it.
        console.debug('input invalid:', input);
        return;
      }
    }
    return {
      category: this.category,
      feedback: this.$.feedback.value,
      email: this.$.email.value,
    };
  },

  resetForm: function() {
    this.$.categoryList.category = 'general';
    this.$.feedback.value = '';
    this.$.email.value = '';
  },
});
