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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        width: 100%;
        height: 100vh;
        font-family: var(--outline-font-family);
      }

      #main {
        flex: 1;
        height: 100%;
        padding: 32px 24px 0 24px;
      }

      #footer {
        flex: 1;
        margin: 48px 0 36px 0;
        text-align: left;
      }

      #logo {
        width: 96px;
      }

      #version {
        color: rgba(0, 0, 0, 0.54);
        font-size: 12px;
        margin: 8px auto;
      }

      #description {
        color: #263238;
        text-align: left;
        font-size: 16px;
        line-height: 22px;
        margin: 32px auto;
      }

      #jigsaw-logo {
        width: 96px;
      }

      @media (min-width: 600px) {
        #description {
          width: 309px;
        }
        #footer {
          text-align: center;
          margin-top: 48px;
        }
        #jigsaw-logo {
          width: 104px;
        }
      }

      @media (max-height: 550px) {
        #main {
          padding: 18px 24px 0 24px;
        }
        #logo {
          width: 76px;
        }
        #description {
          font-size: 14px;
          margin: 18px auto;
        }
        #footer {
          margin: 36px 0 24px 0;
        }
      }

      a {
        color: var(--medium-green);
        text-decoration: none;
      }
    </style>

    <div id="main">
      <img src$="[[rootPath]]assets/brand-logo.png" alt="logo" id="logo" />
      <div id="version">[[localize('version', 'appVersion', version)]] ([[build]])</div>
      <div
        id="description"
        inner-h-t-m-l="[[localize('about-outline', 'jigsawUrl', 'https://jigsaw.google.com', 'outlineUrl', 'https://getoutline.org', 'shadowsocksUrl', 'https://shadowsocks.org', 'gitHubUrl', 'https://github.com/jigsaw-Code/?q=outline', 'redditUrl', 'https://www.reddit.com/r/outlinevpn')]]"
      ></div>
      <div id="footer">
        <a href="https://jigsaw.google.com">
          <img id="jigsaw-logo" src$="[[rootPath]]assets/jigsaw-logo.png" />
        </a>
      </div>
    </div>
  `,

  is: 'about-view',

  properties: {
    // Need to declare localize function passed in from parent, or else
    // localize() calls within the template won't be updated.
    localize: Function,
    rootPath: String,
    version: String,
    build: String,
  },
});
