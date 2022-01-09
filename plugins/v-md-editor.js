import Vue from 'vue';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import VMdPreview from '@kangc/v-md-editor/lib/preview';

import '@kangc/v-md-editor/lib/theme/style/github.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import '../assets/md-fixed.css';

// highlightjs
import hljs from 'highlight.js';

// Resources for the codemirror editor
import Codemirror from 'codemirror';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/lib/codemirror.css';

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme, {
  Hljs: hljs
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdEditor);
Vue.use(VMdPreview);
