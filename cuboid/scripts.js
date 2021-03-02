const gui = new dat.GUI();

const coboid = document.querySelector('.test');

const transforms = {
    width: 50,
    height: 35,
    depth: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    translateZ: 5,
}

const updateProps = () => {
    coboid.style.setProperty(
        '--c-width',
        transforms.width + 'vmin'
    );
    coboid.style.setProperty(
        '--c-height',
        transforms.height + 'vmin'
    );
    coboid.style.setProperty(
        '--c-depth',
        transforms.depth + 'vmin'
    );
    coboid.style.setProperty(
        '--c-rot',
        transforms.rotate + 'deg'
    );
    coboid.style.setProperty(
        '--c-rotX',
        transforms.rotateX + 'deg'
    );
    coboid.style.setProperty(
        '--c-rotY',
        transforms.rotateY + 'deg'
    );
    coboid.style.setProperty(
        '--c-rotZ',
        transforms.rotateZ + 'deg'
    );
    coboid.style.setProperty(
        '--c-transZ',
        transforms.translateZ + 'vmin'
    );
}

updateProps();

gui.add(transforms, 'width', 0, 100, 1)
    .name('Width')
    .onChange(updateProps)

gui.add(transforms, 'height', 0, 100, 1)
    .name('Height')
    .onChange(updateProps)

gui.add(transforms, 'depth', 0, 50, 1)
    .name('Depth')
    .onChange(updateProps)

gui.add(transforms, 'rotate', -360, 360, 1)
    .name('Rotate')
    .onChange(updateProps)

gui.add(transforms, 'rotateX', -360, 360, 1)
    .name('Rotate X')
    .onChange(updateProps)

gui.add(transforms, 'rotateY', -360, 360, 1)
    .name('Rotate Y')
    .onChange(updateProps)

gui.add(transforms, 'rotateZ', -360, 360, 1)
    .name('Rotate Z')
    .onChange(updateProps)

gui.add(transforms, 'translateZ', -50, 50, 1)
    .name('Translate Z')
    .onChange(updateProps)

