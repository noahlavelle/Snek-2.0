# Snek 2.0

Snek 2.0 is a rewriten version of the original Snek - repositary owned by Spindlyskit - and is aimed to be a fun project for me to work on

## Installation

If you want to run the initial version, download the project file follow these steps. This is likely to change in the future.
If you are Node Package Manager - NPM - run this:
```bash
npm install http-server -g
npx http-server
```

Or, if you use an editor like Atom or VSCode, there are open in live server plugins that would also work.

## Usage

Connect on localhost: [ portname ] or the ip a friend gives you to play and matchmake together [ in the future ]
Set the desired canvas width and height in the ```<canvas width="750" height="750" id=""game></canvas>``` tag.
You may now have rectangle canvases, but they should be multiples of 30 as this is the gridsize. You can change this
in js/canvas.js by modifying the gridsize variable at the top. The lower it is, the smalller things are rendered. The
heigher, the larger.

## Contributing
For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)