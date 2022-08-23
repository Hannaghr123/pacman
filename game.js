import kaboom from "./kaboom.js";
kaboom({
    background: [0, 0, 0],
    font: "apl386",
    global: true,
    fullscreen: true,
    clearColor: [0,0.2,0.95,0.4],
    debug: true,
    scale: 2,
});
loadRoot("./sprites/");
loadSprite('pacblock','pacblock.png');
loadSprite('bluepac','bluepac.png');
loadSprite('pinkpac','pinkpac.png');
loadSprite('orangepac','orangepac.png');
loadSprite('redpac','redpac.png');
loadSprite('pacman','pacman.png');
loadSprite('pacfood','pacfood.png');
loadSprite('oppac','oppac.png');

let redpac;
let bluepac;
let pinkpac;
let orangepac;
scene("begin",()=>{

add([text('Press ENTER to start',30), origin('center'), pos(width() / 2, height() /2),
])
keyRelease('enter', () => {
    go("game");
})
})


scene('death', () =>{
add([text('You Lose HAHA!',30), origin('center'), pos(width() / 2, height() /2),
])

add([text('Press ENTER To restart',7), pos(width() - 170,height() - 25 ),
])

keyRelease('enter', () => {
    go("game");
})
})

scene('win', () =>{
    add([text('You Winnnn!',30), origin('center'), pos(width() / 2, height() /2),
])
add([text('Press ENTER To restart',7), pos(width() - 170,height() - 25 ),
])
keyRelease('enter', () => {
    go("game");

})
})

scene("game", () =>{
    layers(['background','obj','ui'], 'obj' );
    const mapKeys = {
        width: 30,
        height: 30,
        'm':()=> [sprite('pacblock'), solid(), area(), "pacblock"],
        "f": ()=>[sprite('pacfood'),'pacfood', area()],
        "c": ()=>[sprite('oppac'),'oppac', area()],
    }   
    const map = [   
        '          mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm          ',
        '          m  mmmmmfffffffffffmmffffffffffffm          ',
        '          mm mmffffmmmmmmmmm mmmmmmfmmmmmmfm          ',
        '          mm mm  m mmmmmm        mmfmmmmmmfm          ',
        '          mm mm            mmmmmmmmfmmmmmmfm          ',
        '          mm mm  mmmmmmfm          ffmmmmmfm          ',
        '          m      mmmmmmfm mmmmmmmmmmfffffffm          ',
        '          mmmmmmmmmmmmmfm m        mmmmmmmfm          ',
        '          mfffffffffffffffm mmmmmm        fm          ',
        '          mfmmmmmmmfmmmmmmm mmmmmmmmmmmmmmmm          ',
        '          mfmfffffffffffffffmmmmmmmmmmmmmmmm          ',
        '          mfmfmmmmmmmmmmfmmffffffffffffffffm          ',
        '          mfmfffffffffffffffcfffmmmmmmmfmmfm          ',
        '          mfmmmmmmmmmmmmmmffffffffffffffmmfm          ',
        '          mfmfffffffffffffffffffm mmmmmfmmfm          ',
        '          mfffmmm mm mmmmmffffffm      fmmfm          ',
        '          mfmmmmm    mfffffmmmmmmmmmmmmfmmfm          ',
        '          mfmmmmmmmm mfmfmfmmmmmmmmmmmmfmmfm          ',
        '          mf         mfmfmfmmmmfffffffffmmfm          ',
        '          mfmmmmmmmmmmfmfmffffffmmmmmmmmmmfm          ',
        '          mfmffffffffffmfmmmm mfmmmmmmmmfffm          ',
        '          mfmfmmmmmmmm mffffm mffffffffffmfm          ',
        '          mfmfmmmmmmmm mmmmfm mfmmmmmmmmmmfm          ',
        '          mfffffffffffffffffffmffffffffffffm          ',
        '          mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm          ',
    
    ];
    
    addLevel(map,mapKeys);

    let i = 0;
    let ghostspeed = 150;
    let pacspeed = 120;
    const jumpForce = 200;
    let right = false;
    let left = false;
    let up = false;
    let down = false;
    let bframes = 0;
    let rframes = 0;
    let pframes = 0;
    let oframes = 0;
    let b = 0;
    let r = 0;
    let p = 0;
    let o = 0;
    let op = false;
    
    let pacman = add([
        sprite('pacman'),
        solid(),
        area(),
        pos(340,50),
        origin('bot'),
        "pacman"
    ]); 

    bluepac = add([
        sprite('bluepac'),
        solid(),
        area(),
        pos(420,600),
        origin('bot'),
        "b"
    ]); 

    redpac = add([
        sprite('redpac'),
        solid(),
        area(),
        pos(1200,180),
        origin('bot'),
        "r"
    ]); 

    pinkpac = add([
        sprite('pinkpac'),
        solid(),
        area(),
        pos(1230,330),
        origin('bot'),
        "p"
    ]); 

    orangepac = add([
        sprite('orangepac'),
        solid(),
        area(),
        pos(1230,690),
        origin('bot'),
        "o"
    ]); 
    
    if(keyPress('d', () => {
        right = true
        left = false
        up = false
        down = false
    }))

    if(keyPress('a', () => {
        left = true
        right = false
        up = false
        down = false
    }))

    if(keyPress('w', () => {
        up = true
        left = false
        right = false
        down = false
    }))

    if(keyPress('s', () => {
        down = true
        left = false
        right = false
        up = false
    }))

    onUpdate(() => {
        if(right === true){
            pacman.move(pacspeed,0)
            pacman.flipX(false)
    }
        if(left === true){
            pacman.move(-pacspeed,0)
            pacman.flipX(true)
    }
        if(up === true){
            pacman.move(0,-pacspeed)
            pacman.flipX(false)
    }
        if(down === true){
            pacman.move(0,pacspeed)
            pacman.flipX(true)
    }
    })   
   
    action(() => {
        console.log(b)
        bframes++
        rframes ++
        pframes ++
        oframes ++
        if(bframes > 90){
            bframes = 0
            b = Math.floor(Math.random()*4) +1
            }
        if(rframes > 70){
            rframes = 0
            r = Math.floor(Math.random()*4) +1
            }
        if(pframes > 75){
            pframes = 0
            p = Math.floor(Math.random()*4) +1
            }
        if(oframes > 100){
            oframes = 0
            o = Math.floor(Math.random()*4) +1
            }
        
        if(op == true){
            bluepac.flipY(true)
            redpac.flipY(true)
            pinkpac.flipY(true)
            orangepac.flipY(true)
        }
        else if(op == false){
            bluepac.flipY(false)
            redpac.flipY(false)
            pinkpac.flipY(false)
            orangepac.flipY(false)
        }
    })
        
        

    pacman.onCollide("b", (b) => {
        if (op == false){
            destroy(pacman)
            go("death")
            
        }
        else{
            destroy(b)
            respawn_pac("b")
        }
        
    })     
    
    pacman.onCollide("r", (r) => {
        if (op == false){
            destroy(pacman)
            go("death")
        }
        else{
            destroy(r)
            respawn_pac("r")
        }
        
    })

    pacman.onCollide("p", (p) => {
        if (op == false){
            destroy(pacman)
            go("death")
        }
        else{
            destroy(p)
            respawn_pac("p")
        }
        
    })

    pacman.onCollide("o", (o) => {
        if (op == false){
            destroy(pacman)
            go("death")
        }
        else{
            destroy(o)
            respawn_pac("o")
        }
        
    })


onUpdate(() => {
    if(b === 1){
        bluepac.move(ghostspeed,0)  
}
    if(b === 2){
        bluepac.move(-ghostspeed,0)
}
    if(b === 3){
        bluepac.move(0,-ghostspeed)
}
    if(b === 4){
        bluepac.move(0,ghostspeed)
}
    if(r === 1){
        redpac.move(0,ghostspeed)
}
    if(r === 2){
        redpac.move(ghostspeed,0)    
}
    if(r === 3){
        redpac.move(-ghostspeed,0)    
}
    if(r === 4){
        redpac.move(0,-ghostspeed)    
}

    if(p === 1){
        pinkpac.move(0,ghostspeed)
}
    if(p === 2){
        pinkpac.move(0,-ghostspeed)    
}
    if(p === 3){
        pinkpac.move(ghostspeed,0)    
}
    if(p === 4){
        pinkpac.move(-ghostspeed,0)    
}

    if(o === 1){
        orangepac.move(0,ghostspeed)
}
    if(o === 2){
        orangepac.move(-ghostspeed,0)    
}
    if(o === 3){
        orangepac.move(0,-ghostspeed)    
}
    if(o === 4){
        orangepac.move(ghostspeed,0)    
}
})
pacman.onCollide("pacfood", (x) => {
    destroy(x)
    i++
    if(i > 276){
    go("win")
}
})
pacman.onCollide("oppac", (x) => {
    destroy(x)
    op = true;
    setInterval(myTimer, 10000);
})

function myTimer() {
    op = false
}

async function respawn_pac(name){
    await wait(10);
    if(name === "b"){
        
        bluepac = add([
            sprite('bluepac'),
            solid(),
            area(),
            pos(420,600),
            origin('bot'),
            "b"
        ]); 

    } else if(name==="r"){
            
        redpac = add([
            sprite('redpac'),
            solid(),
            area(),
            pos(1200,180),
            origin('bot'),
            "r"
        ]); 
    
    } else if(name ==="p"){
            
        pinkpac = add([
            sprite('pinkpac'),
            solid(),
            area(),
            pos(1230,330),
            origin('bot'),
            "p"
        ]); 
        
    } else{
        if(name==="o"){
            
        orangepac = add([
            sprite('orangepac'),
            solid(),
            area(),
            pos(1230,690),
            origin('bot'),
            "o"
        ]); 

    }}
}
const Arr1 = [2,3,4]
const Arr2 = [1,3,4]
const Arr3 = [1,2,4]



bluepac.onCollide("pacblock", (b) => {
    bframes = 600
})

redpac.onCollide("pacblock", (r) => {
    rframes = 600
})

pinkpac.onCollide("pacblock", (p) => {
    pframes = 600
})

orangepac.onCollide("pacblock", (o) => {
    oframes = 600
})

})
go('begin');