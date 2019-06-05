import {
  Widget
} from '@phosphor/widgets';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_xkcd extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_xkcd',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_xkcd is activated!');
    console.log('ICommandPalette:', palette);

    let widget: Widget = new Widget();
    let img = document.createElement('img');
    widget.node.appendChild(img);
    widget.id = 'xkcd-jupyterlab';
    widget.title.label = 'xkcd.com';
    widget.title.closable = true;
    widget.addClass('jp-xkcdWidget);
    img.className = 'jp-xkcdCartoon';

    img.insertAdjacentHTML('afterend',
       `<div class="jp-xkcdAttribution">
	    <a href="https://creativecommons.org/licenses/by-nc/2.5/" class="jp-xkcdAttribution" target="_blank">
		    <img src="https://licensebuttons.net/l/by-nc/2.5/80x15.png" />
	    </a>
        </div>`
    );

    fetch('https:////egszlpbmle.execute-api.us-east-1.amazonaws.com/prod').then(response=>{
      return response.json();
    }).then(data=>{
      img.src = data.img;
      img.alt = data.title;
      img.title = data.alt;
    });
    const command: string = 'xkcd:open';
    app.commands.addCommand(command, {
      label: 'Random xkcd comic',
      execute: ()=>{
        if(!widget.isAttached){
	  app.shell.addToMainArea(widget);
	}
	app.shell.activateById(widget.id);
      }
    });
    palette.addItem({command, category:'Tutorial'});
  }
};

export default extension;


