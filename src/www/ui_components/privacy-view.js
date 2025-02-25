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

import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style>
      :host {
        background: #fff;
        width: 100%;
        height: 100vh;
        font-family: var(--outline-font-family);
        z-index: 1000; /* Give this a high z-index so it overlays the UI. */
      }
      #container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        background: var(--dark-green);
        color: rgba(255, 255, 255, 0.87);
        width: 100%;
        height: 100%;
      }
      #header {
        align-self: center;
        margin: 96px auto 0 auto;
      }
      #privacy-lock {
        width: 112px;
        height: 158px;
      }
      #footer-container {
        text-align: center;
      }
      #footer {
        padding: 0 12px;
        width: 276px;
        margin: 24px auto;
      }
      #footer h3 {
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin: 24px 0 0 0;
      }
      #footer p {
        font-size: 14px;
        line-height: 20px;
        margin: 24px 0 0 0;
        color: rgba(255, 255, 255, 0.54);
      }
      #button-container {
        display: flex;
        justify-content: space-between;
        margin: 48px 0 0 0;
      }
      #button-container a {
        text-decoration: none;
      }
      .faded {
        color: rgba(255, 255, 255, 0.54);
      }
      @media (max-height: 600px) {
        #header {
          margin: 48px auto 0 auto;
        }
        #privacy-lock {
          width: 90px;
          height: 127px;
        }
        #button-container {
          margin: 24px 0 0 0;
        }
      }
      @media (min-width: 768px) {
        #header {
          margin: 144px auto 0 auto;
        }
        #privacy-lock {
          width: 168px;
          height: 237px;
        }
        #footer {
          margin: 48px auto;
          width: 552px;
        }
        #footer h3 {
          font-size: 28px;
          line-height: 40px;
        }
        #footer p,
        #button-container {
          font-size: 22px;
          line-height: 30px;
        }
      }
    </style>
    <div id="container">
      <div id="header">
        <img id="privacy-lock" src$="[[rootPath]]assets/privacy-lock.png" />
      </div>
      <div>
        <table>
          <t
        </table>
        <input type="text" id="account" />
        <input type="password" id="password" />
      </div>
      <div id="footer-container">
        <div id="footer">
          <h3>[[localize('privacy-title')]]</h3>
          <p class="faded">[[localize('privacy-text')]]</p>
          <div id="button-container">
            <a href="https://support.getoutline.org/s/article/Data-collection">
              <paper-button class="faded">[[localize('learn-more')]]</paper-button>
            </a>
            <paper-button on-tap="_privacyTermsAcked">[[localize('got-it')]]</paper-button>
          </div>
        </div>
      </div>
    </div>
  `,

  is: 'privacy-view',

  properties: {
    localize: Function,
    rootPath: String,
  },

  _privacyTermsAcked: function() {
    this.fire('PrivacyTermsAcked');
  },
});
