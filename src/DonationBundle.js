import store from 'store';
import uuid from 'uuid';

const KEY = "donationBundle";

class DonationBundle {

  get = () => {
    return store.get(KEY) || {donations: {}};
  }

  save = (bundle) => {
    // loop over donations and save total
    const total = Object.keys(bundle.donations).reduce(
      (previous, id) => {
        const donation = bundle.donations[id];
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
