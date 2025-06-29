// Domain entity for sports clubs
export class Club {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly logo: string,
    public readonly founded: Date,
    public readonly sport: string,
    public readonly location: string,
    public readonly website?: string,
    public readonly socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    }
  ) {}

  public getDisplayInfo(): {
    name: string;
    description: string;
    logo: string;
    sport: string;
    location: string;
  } {
    return {
      name: this.name,
      description: this.description,
      logo: this.logo,
      sport: this.sport,
      location: this.location
    };
  }

  public getSocialLinks(): Array<{ platform: string; url: string }> {
    const links: Array<{ platform: string; url: string }> = [];
    
    if (this.socialMedia?.facebook) {
      links.push({ platform: 'Facebook', url: this.socialMedia.facebook });
    }
    if (this.socialMedia?.instagram) {
      links.push({ platform: 'Instagram', url: this.socialMedia.instagram });
    }
    if (this.socialMedia?.twitter) {
      links.push({ platform: 'Twitter', url: this.socialMedia.twitter });
    }
    
    return links;
  }
}
