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
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style>
      :host {
        background: white;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 12px;
      }

      code {
        font-size: 0.7em;
      }
    </style>

    <code id="licensesText"></code>
  `,

  is: 'licenses-view',

  properties: {
    // Need to declare localize function passed in from parent, or else
    // localize() calls within the template won't be updated.
    localize: Function,
    rootPath: String,
  },

  _licensesLoaded: false,

  ready: function() {
    // This complexity is to avoid unconditionally loading the (huge) license
    // text at startup.
    var appRoot = dom(this).getOwnerRoot().host;
    window.addEventListener(
      'location-changed',
      function() {
        if (this._licensesLoaded || appRoot.page !== 'licenses') {
          return;
        }

        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
          this.$.licensesText.innerText = xhr.responseText;
          this._licensesLoaded = true;
        };
        xhr.onerror = () => {
          console.error('could not load license.txt');
        };
        // This path works in both Cordova and Electron.
        // Do *not* add a leading slash.
        xhr.open('GET', 'ui_components/licenses/licenses.txt', true);
        xhr.send();
      }.bind(this)
    );
  },
});
