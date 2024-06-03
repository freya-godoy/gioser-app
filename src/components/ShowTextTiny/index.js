import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const RichTextDisplay = ({content}) => {
    const [isTinyMCELoaded, setIsTinyMCELoaded] = useState(false);

    useEffect(() => {
    // Verificar si TinyMCE está definido
        if (window.tinymce) {
            setIsTinyMCELoaded(true);
        } else {
            // Si TinyMCE no está definido, cargar el script
            const script = document.createElement('script');
            script.src = 'https://cdn.tiny.cloud/1/gn3dmh25it41o28zlso2z0vko903vci2kenxwut6zxny5y62/tinymce/5/tinymce.min.js';
            script.async = true;
            script.onload = () => {
                setIsTinyMCELoaded(true);
            };
            document.head.appendChild(script);
        }
    }, []);

    useEffect(() => {
        if (isTinyMCELoaded) {
            // Inicializa TinyMCE solo cuando esté cargado
            window.tinymce.init({
                selector: '.rich-text-display',
                plugins: 'autoresize',
                toolbar: false,
                autoresize_min_height: 100,
                autoresize_max_height: 300,
                readonly: true
            });

            // Establece el contenido en el editor TinyMCE
            window.tinymce.activeEditor.setContent(content);

            return () => {
                // Desinicializa TinyMCE cuando el componente se desmonte
                window.tinymce.remove();
            };
        }
        return false;
    }, [isTinyMCELoaded, content]);

    return <div className="rich-text-display"/>;
};

RichTextDisplay.propTypes = {
    content: PropTypes.string.isRequired
};

export default RichTextDisplay;
