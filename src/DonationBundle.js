import store from 'store';
import uuid from 'uuid';
import _ from 'underscore';

const KEY = "donationBundle";

class DonationBundle {

  get = () => {
    return store.get(KEY) || {donations: {}};
  }

  save = (bundle) => {
    const total = _.reduce(bundle.donations,
      (previous, donation) => {
        return previous += Number(donation.amount);
      }, 0);

    bundle.total = total;
    store.set(KEY, bundle);
  }

  clear = () => {
    store.remove(KEY);
  }


  createDonation = () => {
    return {
      amount      : '',
      studentName : '',
      shoutOut    : '',
      key         : uuid.v1()
    };
  }

  saveDonation = (data) => {
    const bundle = this.get();
    bundle.donations[data.key] = data;
    this.save(bundle);
  }

  getDonation = (key) => {
    return this.get().donations[key];
  }

  deleteDonation = (key) => {
    const bundle = this.get();
    bundle.donations[key] = null;
    delete bundle.donations[key];
    this.save(bundle);
  }

}

export default DonationBundle;
