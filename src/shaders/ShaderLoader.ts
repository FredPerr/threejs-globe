export const 
    VERTEX_SHADER = 'VS',
    FRAGMENT_SHADER = 'FS';

/**
 * Load a shader from the HTML source code.
 * The format of the HTML node id should fit the 
 */
export function loadShader(type: string, shaderName: string){
    const id = `${type}${shaderName}`;
    const content = document.getElementById(id); 
    if (content == null)
        throw new ReferenceError(`Could not find the ${id} HTML node!`);
    return content.innerHTML
}