import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap';

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import Beautify from 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-keybinding_menu';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-statusbar';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/snippets/html';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/snippets/css';
import 'ace-builds/src-noconflict/keybinding-vscode';

import get from 'lodash/get';

import {TextWithBadge} from '@fepp/form-builder/dist/components/fields';

import fromState from '@selectors';

const TextEditor = ({value, onChange, name, ...props}) => {
    const i18n = useSelector(state => fromState.Session.getI18N(state));
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(oldState => !oldState);

    return (
        <div className="form--text-editor mt-4">
            <TextWithBadge {...props}/>
            <Button
                color="primary"
                className="mt-auto float-right"
                onClick={() => toggle()}
            >
                {get(i18n, 'preview')}
            </Button>
            <br/>
            <AceEditor
                showGutter
                highlightActiveLine
                enableBasicAutocompletion
                enableLiveAutocompletion
                enableSnippets
                showLineNumbers
                {...{
                    showPrintMargin: false,
                    tabSize: 2,
                    fontSize: 12,
                    mode: 'html',
                    theme: 'monokai',
                    name,
                    id: name,
                    style: {
                        width: '100%',
                        marginTop: '10px',
                        zIndex: 0
                    },
                    value,
                    onChange: value => onChange({
                        target: {
                            value,
                            name
                        }
                    }),
                    commands: [Beautify.commands]
                }}
            />
            <Modal isOpen={modal} toggle={toggle} size="large" id="preview-content">
                <ModalHeader toggle={toggle}>
                    {get(i18n, 'preview')}
                    &nbsp;
                    content
                </ModalHeader>
                <ModalBody>
                    <Row className="w-100">
                        <Col
                            className="w-100"
                            dangerouslySetInnerHTML={{__html: value}}
                        />
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" outline onClick={toggle}>
                        {get(i18n, 'confirm')}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

TextEditor.displayName = 'textEditor';

TextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string
};

TextEditor.defaultProps = {value: ''};

export default TextEditor;
