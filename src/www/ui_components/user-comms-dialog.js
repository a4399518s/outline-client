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
      #wrapper {
        background: var(--dark-green);
        color: rgba(255, 255, 255, 0.54);
        text-align: center;
      }

      #content {
        padding: 8px 0 16px 0;
      }

      a {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.54);
      }

      .highlight {
        color: rgba(255, 255, 255, 0.87);
      }

      #tips {
        padding: 8px 0;
        font-size: 12px;
        opacity: 0.87;
        color: rgba(255, 255, 255, 0.54);
      }

      #tips iron-icon {
        height: 18px;
      }

      #title,
      #detail {
        margin: 8px 0;
      }

      #detail {
        width: 75%;
        margin-left: auto;
        margin-right: auto;
      }

      /*
        Animated entry/exit using a max-height-based transition, as suggested at:
        https://stackoverflow.com/questions/3508605/how-can-i-transition-height-0-to-height-auto-using-css

        The advantage of a max-height-based transition is that the flow of the surrounding of the
        elements is taken into account. Very important for any server cards beneath!

        Note: The "active" max-height isn't as hard-coded as it may look: just pick something much
        larger than is ever expected in practice - only the actual height will be used.
      */

      #wrapper {
        max-height: 0;
        transition: max-height 0.5s ease-out;
        overflow: hidden;
      }

      #wrapper.active {
        max-height: 1000px;
        transition: max-height 0.5s ease-in;
      }
    </style>

    <div id="wrapper">
      <div id="content">
        <div id="tips"><iron-icon icon="icons:lightbulb-outline"></iron-icon>[[localize(iconTextLocalizationKey)]]</div>
        <div id="title" class="highlight">[[localize(titleLocalizationKey)]]</div>
        <div id="detail">[[localize(detailLocalizationKey)]]</div>
        <div id="buttons">
          <a hidden$="[[_shouldHideLink()]]" href$="[[linkUrl]]">
            <paper-button>[[localize(linkTextLocalizationKey)]]</paper-button>
          </a>
          <paper-button class="highlight" on-tap="_dismiss"
            >[[localize(dismissButtonTextLocalizationKey)]]</paper-button
          >
        </div>
      </div>
    </div>
  `,

  is: 'user-comms-dialog',

  properties: {
    // Need to declare localize function passed in from parent, or else
    // localize() calls within the template won't be updated.
    localize: Function,
    // Localization key for the dialog title. Required.
    titleLocalizationKey: String,
    // Localization key for the text detail. Required.
    detailLocalizationKey: String,
    // Optional localization key for the text displayed next to the icon.
    iconTextLocalizationKey: {
      type: String,
      value: 'tips',
    },
    // Optional URL for the left side link button. If empty, the link will not be displayed.
    linkUrl: String,
    // Optional text localization key for the left side button.
    linkTextLocalizationKey: {
      type: String,
      value: 'get-help',
    },
    // Optional text localization key for the right side dismiss button.
    dismissButtonTextLocalizationKey: {
      type: String,
      value: 'got-it',
    },
    // Optional event to fire when the dialog is dismissed.
    fireEventOnHide: String,
  },

  show: function() {
    this.$.wrapper.classList.add('active');
  },

  hide: function() {
    this.$.wrapper.classList.remove('active');
  },

  _dismiss: function() {
    this.hide();
    if (!!this.fireEventOnHide) {
      this.fire(this.fireEventOnHide);
    }
  },

  _shouldHideLink: function() {
    return !this.linkUrl;
  },
});
