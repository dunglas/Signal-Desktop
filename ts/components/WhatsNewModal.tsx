// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { ReactChild } from 'react';
import React from 'react';
import moment from 'moment';

import { Modal } from './Modal';
import { Intl } from './Intl';
import { Emojify } from './conversation/Emojify';
import type { LocalizerType, RenderTextCallbackType } from '../types/Util';

export type PropsType = {
  hideWhatsNewModal: () => unknown;
  i18n: LocalizerType;
};

type ReleaseNotesType = {
  date: Date;
  version: string;
  features: Array<JSX.Element>;
};

const renderText: RenderTextCallbackType = ({ key, text }) => (
  <Emojify key={key} text={text} />
);

export function WhatsNewModal({
  i18n,
  hideWhatsNewModal,
}: PropsType): JSX.Element {
  let contentNode: ReactChild;

  const releaseNotes: ReleaseNotesType = {
    date: new Date(window.getBuildCreation?.() || Date.now()),
    version: window.getVersion?.(),
    features: [
      <Intl i18n={i18n} id="icu:WhatsNew__v6.19--0" renderText={renderText} />,
      <Intl
        i18n={i18n}
        id="icu:WhatsNew__v6.19--1"
        renderText={renderText}
        components={{
          sha265: (
            <a href="https://github.com/sha-265">@sha-265</a>
          ),
        }}
        />,
      <Intl i18n={i18n} id="icu:WhatsNew__v6.19--2" renderText={renderText} components={{"supportLink": (<a href="https://support.signal.org/hc/en-us/articles/5109141421850-Supporting-Older-Operating-Systems">https://support.signal.org/hc/en-us/articles/5109141421850-Supporting-Older-Operating-Systems
      </a>)}}/>,
    ],
  };

  if (releaseNotes.features.length === 1) {
    contentNode = <p>{releaseNotes.features[0]}</p>;
  } else {
    contentNode = (
      <ul>
        {releaseNotes.features.map(element => {
          return <li key={element.props.id}>{element}</li>;
        })}
      </ul>
    );
  }

  return (
    <Modal
      modalName="WhatsNewModal"
      hasXButton
      i18n={i18n}
      onClose={hideWhatsNewModal}
      title={i18n('icu:WhatsNew__modal-title')}
    >
      <>
        <span>
          {moment(releaseNotes.date).format('LL')} &middot;{' '}
          {releaseNotes.version}
        </span>
        {contentNode}
      </>
    </Modal>
  );
}
