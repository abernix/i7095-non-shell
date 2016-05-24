import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import AWS from 'aws-sdk';

const createFakeAccount = () => {
  const fakeEmail = `${Math.random()}@test.com`;
  console.log('=> Creating a fake account', fakeEmail);
  const newUserId = Accounts.createUser({ email: fakeEmail, password: 'test' });
  console.info("  => New UserId is", newUserId);
  return newUserId;
};

Meteor.methods({
  go() {
    return createFakeAccount();
  },
  goAws() {
    console.log('=> Doing AWS stuff _then_ creating a fake account');

    const s3 = new AWS.S3({
      accessKeyId: 'a',
      secretAccessKey: 'k',
    });

    const listBucketsSync = Meteor.wrapAsync(s3.listBuckets, s3);

    try {
      const data = listBucketsSync();
      data.Buckets.forEach(bucket => console.log('Bucket:', bucket.Name));
    } catch (err) {
      console.log('[AWS Error]', err.message);
    }

    // It _will_ error unless you put proper credentials but error or not...
    return createFakeAccount();
  }
})