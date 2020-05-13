const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../playstore')

describe('testing playstore app', () => {
    it('can get apps without queries', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.be.an('object');
                expect(res.body[0]).to.include.all.keys(['App','Category','Rating','Genres']);
            })
    })
    it('should be 400 if sort is invalid', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE' })
            .expect(400, 'Sort must be my app name or rating');
    })
    it('should be 400 if genres is invalid', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'MISTAKE' })
            .expect(400, 'Genres include Action, Puzzle, Strategy, Casual, Arcade, or Card');
    })
    it('can sort apps by app', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'app' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                // compare book at `i` with next book at `i + 1`
                const bookAtI = res.body[i];
                const bookAtIPlus1 = res.body[i + 1];
                // if the next book is less than the book at i,
                if (bookAtIPlus1.title < bookAtI.title) {
                    // the books were not sorted correctly
                    sorted = false;
                    break; // exit the loop
                }
                i++;
                }
                expect(sorted).to.be.true;
            });
    })
    it('can sort apps by rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                // compare book at `i` with next book at `i + 1`
                const bookAtI = res.body[i];
                const bookAtIPlus1 = res.body[i + 1];
                // if the next book is less than the book at i,
                if (bookAtIPlus1.title < bookAtI.title) {
                    // the books were not sorted correctly
                    sorted = false;
                    break; // exit the loop
                }
                i++;
                }
                expect(sorted).to.be.true;
            });
    })
    it('are filtered apps',() => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'card'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res =>{
                    expect(res.body).to.be.an('array')
            })
    })
})