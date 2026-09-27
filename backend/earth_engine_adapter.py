"""Earth Engine connection seam.
The current prototype returns a clearly labelled fallback signal.
Replace get_satellite_signal() with a real Sentinel-2/NDVI Earth Engine query
once the Google Earth Engine Cloud Project/service account is configured.
"""
def get_satellite_signal(latitude:float,longitude:float,crop:str):
    return {'ndvi':0.54,'trend':'↘ Mild decline','risk':68,'source':'Prototype satellite signal — connect Google Earth Engine for live NDVI'}
