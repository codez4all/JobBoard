/**
 * Created by sheetal on 3/14/17.
 */

'use strict';

module.exports.createSlug = createSlug;

function createSlug(){
  return value
    .toLowerCase()
    .replace(/[^\w\s]+/g,'')
    .trim()
    .replace(/[\s]+/g,'-');
}
