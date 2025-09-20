class UserDomain {
  constructor(userData) {
    this.id = userData.id;
    this.email = userData.email;
    this.createdAt = userData.createdAt;
  }

  isValid() {
    return this.email && this.email.includes('@');
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

module.exports = UserDomain;