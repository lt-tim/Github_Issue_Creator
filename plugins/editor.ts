import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
export default defineNuxtPlugin(nuxtApp => {
    VMdEditor.use(githubTheme, {
        Hljs: hljs,
    });

    VMdEditor.lang.use('en-US', enUS);

    nuxtApp.vueApp.use(VMdEditor);
})