const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Notes API", () => {
  let noteId; // variable to store the created note ID

  // Creating a note before running the PUT and DELETE tests
  before((done) => {
    chai.request(server)
      .post('/api/v1/notes')
      .send({ title: "Temporary Note", content: "This is a temporary note." })
      .end((err, res) => {
        noteId = res.body.data._id; // Assign the ID from the response to noteId
        done();
      });
  });

  // Test for Creating a Note
  describe("POST /api/v1/notes", () => {
    it("should create a new note", (done) => {
      const note = {
        title: "Test Note",
        content: "Content of the test note"
      };
      chai.request(server)
        .post('/api/v1/notes')
        .send(note)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('title', note.title);
          expect(res.body.data).to.have.property('content', note.content);
          done();
        });
    });
  });

  // Test for Retrieving All Notes
  describe("GET /api/v1/notes", () => {
    it("should get all notes", (done) => {
      chai.request(server)
        .get('/api/v1/notes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Test for Updating a Note
  describe("PUT /api/v1/notes/:id", () => {
    it("should update a note", (done) => {
      const updatedNote = {
        title: "Updated Test Note",
        content: "Updated content of the test note"
      };
      chai.request(server)
        .put(`/api/v1/notes/${noteId}`) // Use the dynamically obtained noteId
        .send(updatedNote)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  // Test for Deleting a Note
  describe("DELETE /api/v1/notes/:id", () => {
    it("should delete a note", (done) => {
      chai.request(server)
        .delete(`/api/v1/notes/${noteId}`) // Use the dynamically obtained noteId
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Optionally clean up after tests
  after((done) => {
    done();
  });
});
