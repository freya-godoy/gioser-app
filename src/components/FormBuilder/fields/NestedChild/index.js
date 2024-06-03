import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
    Button
} from 'reactstrap';
import {TextWithBadge} from '@fepp/form-builder/dist/components/fields';

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import map from 'lodash/map';
import replace from 'lodash/replace';
import size from 'lodash/size';

import clickOutside from '@core/hooks/clickOutside';
import fromState from '@selectors';

import Item from './Item';
import {addChild} from './utils';

const NestedChild = ({value, onChange, depth, levelText, maxChild, ...props}) => {
    const i18n = useSelector(fromState.Session.getI18N);
    const [activeTab, toggle] = useState(null);
    const [dragItem, handleDrag] = useState({});
    const wrapperRef = useRef(null);
    clickOutside(wrapperRef, () => toggle(null));
    if (size(value) === 0) {
        return (
            <>
                <TextWithBadge {...props}/>
                <div className="text-center my-5 form-nested-child">
                    <p>
                        <b>
                            {replace(
                                get(i18n, 'contentOfNested'),
                                '$$TEXT$$',
                                get(props, 'text')
                            )}
                        </b>
                    </p>
                    <p>
                        {replace(
                            replace(
                                get(i18n, 'toStartASyllabus'),
                                '$$TEXT$$',
                                get(props, 'text')
                            ),
                            '$$LEVEL$$',
                            get(levelText, 1, '')
                        )}
                    </p>
                    <Button
                        type="button"
                        onClick={() => {
                            const newValues = addChild(value);
                            onChange({
                                target: {
                                    value: newValues,
                                    name: get(props, 'name')
                                }
                            });
                        }}
                        color="primary"
                    >
                        {get(i18n, 'add')}
                    </Button>
                </div>
            </>
        );
    }

    return (
        <div ref={wrapperRef} className="form-nested-child">
            <TextWithBadge {...props}/>
            {map(value, (val, it) => (
                <Item
                    key={`${levelText[1]}.${it.id}`}
                    {...{
                        ...val,
                        depth,
                        levelText,
                        maxChild,
                        lastPosition: (it + 1) === size(value),
                        handleDrag,
                        dragItem,
                        i18n
                    }}
                    main={cloneDeep(value)}
                    level={1}
                    position={it}
                    path={it}
                    current={activeTab}
                    onChange={e => onChange(e)}
                    onClick={position => toggle(position || it)}
                />
            ))}
        </div>
    );
};

NestedChild.propTypes = {
    value: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onChange: PropTypes.func.isRequired,
    depth: PropTypes.string.isRequired,
    levelText: PropTypes.string.isRequired,
    maxChild: PropTypes.string.isRequired
};

NestedChild.displayName = 'nestedChild';

export default NestedChild;
