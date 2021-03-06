var should   = require('should/as-function');
var Album    = require('../../src/output-website/album.js');
var byfolder = require('../../src/output-website/by-folder.js');
var fixtures = require('../fixtures');

describe('ByFolder', function() {

  it('creates albums by folders', function () {
    // create files in different folders
    var london1 = fixtures.photo({path: 'london/IMG_000001.jpg'});
    var london2 = fixtures.photo({path: 'london/IMG_000002.jpg'});
    var newyork1 = fixtures.photo({path: 'newyork/IMG_000003.jpg'});
    var newyork2 = fixtures.video({path: 'newyork/IMG_000004.mp4'});
    // group them per folder
    var collection = {files: [london1, london2, newyork1, newyork2]};
    var albums = byfolder.albums(collection, {});
    // assert on the result
    should(albums).eql([
      new Album({
        title: 'london',
        files: [london1, london2]
      }),
      new Album({
        title: 'newyork',
        files: [newyork1, newyork2]
      })
    ]);
  });

  it('creates nested albums for nested folders', function () {
    // create files in nested folders
    var photo1 = fixtures.photo({path: 'a/b/c/IMG_000001.jpg'});
    var photo2 = fixtures.photo({path: 'a/d/IMG_000002.jpg'});
    // group them per folder
    var collection = {files: [photo1, photo2]};
    var albums = byfolder.albums(collection, {});
    // assert on the result
    should(albums).eql([
      new Album({
        title: 'a',
        files: [],
        albums: [
          new Album({
            title: 'b',
            files: [],
            albums: [
              new Album({
                title: 'c',
                files: [photo1]
              })
            ]
          }),
          new Album({
            title: 'd',
            files: [photo2]
          })
        ]
      })
    ]);
  });

});
