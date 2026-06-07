/*
  Affiliate configuration file.
  Replace placeholder IDs with your real affiliate IDs/tags.
  Fields:
    - utm_campaign: default campaign name (overridden per-link via data-aff-campaign)
    - platforms: mapping of platform -> affiliate parameter name and id
      param: query parameter name to add for the affiliate program
      id: your affiliate id/tag

  NOTE: Different affiliate programs use different parameter names. Fill these
  values according to your affiliate account docs. This script will also append
  UTM parameters for basic tracking.
*/
window.affiliateConfig = {
  utm: {
    source: 'elitetech',
    medium: 'affiliate',
    campaign: 'deal'
  },
  platforms: {
    amazon: { param: 'tag', id: 'your-amazon-tag' },
    walmart: { param: 'wmlspartner', id: 'your-walmart-id' },
    cj: { param: 'sid', id: 'your-cj-id' },
    impact: { param: 'afftrack', id: 'your-impact-id' },
    shareasale: { param: 'afftrack', id: 'your-shareasale-id' },
    ebay: { param: 'campid', id: 'your-ebay-id' }
  }
};
