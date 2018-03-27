 insert into GEOCAT.viz_visualitzacio (businessId, entitat, geometry_type, nom, options, tipus, id) values ( '63be4ee874e5f4eb3bf2705e68070248',  '1',  'marker',  'Capa Punt 1',  '{"propName":"nom,text,latitud,longitud,etrs89_x,etrs89_y,alcada"}',  'origenTematic',  '349232');
 insert into GEOCAT.servidor (businessId, epsg, options, server_name, server_type, transp, url, visibilitat, entitatUid, img_format, inf_format, layers, legend, opacity, query, tiles, titles, version, DTYPE, id) values ( '63be4ee874e5f4eb3bf2705e68070248',  '',  '{"id":349232,"businessId":"63be4ee874e5f4eb3bf2705e68070248","nom":"Capa Punt 1","geometryType":"marker","tipus":"origenTematic","options":"{\"propName\":\"nom,text,latitud,longitud,etrs89_x,etrs89_y,alcada\"}","entitat":{"id":1,"uid":"bolo","nomEntitatComplert":"Wladimir Jose Szczerban","rol":"A","email":"wladimir.szczerban@icc.cat","status":"A","bbox":"260383,4491989,527495,4748184","ambitGeoId":1,"tipusEntitatId":1}}',  'Capa Punt 1',  'visualitzacio',  '',  '',  'O',  '1',  '',  '',  NULL,  '',  '1',  NULL,  '',  NULL,  '', 'ServidorWMS',  '349233');
 insert into GEOCAT.aplicacioservidorwms (businessId, servidorwms_id) values ( '321229',  '349233');
 insert into GEOCAT.viz_geometries (businessId, entitat, geometry_type, nom, options, publica, id) values ( '63be4ee874e5f4eb3bf2705e68070248',  '1',  'marker',  NULL,  'nom,text,latitud,longitud,etrs89_x,etrs89_y,alcada',  'f',  '349234');
 update GEOCAT.viz_visualitzacio set businessId= '63be4ee874e5f4eb3bf2705e68070248', entitat= '1', geometriesColleccioId= '349234', geometry_type= 'marker', nom= 'Capa Punt 1', options= '{"propName":"nom,text,latitud,longitud,etrs89_x,etrs89_y,alcada"}', tipus= 'origenTematic' where id= '349232';
 insert into GEOCAT.viz_geometria (businessId, geometry, properties, type, id) values ( 'e6842b59c6b65153027cb31147af53d9',  '0101000020E6100000000000008096F63FA5D22C0A4DE44440',  '{"nom": "Títol Punt 0", "text": "Descripció Punt 0", "alcada": "542", "latitud": "41.78360", "etrs89_x": "368017.44", "etrs89_y": "4626969.10", "longitud": "1.41174"}',  'Point',  '349235');
 update GEOCAT.viz_geometria set geometriesId= '349234' where id= '349235';
 insert into GEOCAT.viz_estil (border_color, border_width, businessId, color, icon_anchor, icon_size, label, label_color, label_font, label_halo_color, label_halo_width, label_size, line_style, line_width, marker, opacity, poligon_style, radius, simbol, simbol_color, simbol_size, id) values ( NULL,  '0',  '5849ad128360420799104c75967b7a14',  'transparent',  '14#42',  '28#42',  'f',  '#000000',  'arial',  NULL,  '0',  '10',  NULL,  '0',  'purple',  '100',  NULL,  '6',  '',  '#000000',  '0',  '349236');
 update GEOCAT.viz_estil set estilId= '349232' where id= '349236';
 insert into GEOCAT.viz_estilgeometria (businessId, geometria_id) values ( '349236',  '349235');
 update GEOCAT.viz_geometria set businessId= 'e6842b59c6b65153027cb31147af53d9', geometry= '0101000020E6100000000000008096F63FA5D22C0A4DE44440', properties= '{"nom": "update titiol", "text": "Descripció Punt 0", "alcada": "542", "latitud": "41.78360", "etrs89_x": "368017.44", "etrs89_y": "4626969.10", "longitud": "1.41174"}', type= 'Point' where id= '349235';
 update GEOCAT.servidor set businessId= '63be4ee874e5f4eb3bf2705e68070248', epsg= '', options= '{"id":349232,"businessId":"63be4ee874e5f4eb3bf2705e68070248","nom":"Capa Punt 1","geometryType":"marker","tipus":"origenTematic","options":"{\"propName\":\"nom,text,latitud,longitud,etrs89_x,etrs89_y,alcada\"}","entitat":{"id":1,"uid":"bolo","nomEntitatComplert":"Wladimir Jose Szczerban","rol":"A","email":"wladimir.szczerban@icc.cat","status":"A","bbox":"260383,4491989,527495,4748184","ambitGeoId":1,"tipusEntitatId":1}}', server_name= 'borrar test punt', server_type= 'visualitzacio', transp= '', url= '', visibilitat= 'O', entitatUid= '1', img_format= '', inf_format= '', layers= NULL, legend= '', opacity= '1', query= NULL, tiles= '', titles= NULL, version= '' where id= '349233';
 update GEOCAT.viz_visualitzacio set businessId= '63be4ee874e5f4eb3bf2705e68070248', entitat= '1', geometry_type= 'marker', nom= 'borrar test punt', options= '{"propName":"nom,text,latitud,longitud,etrs89_x,etrs89_y,alcada"}', tipus= 'origenTematic' where id= '349232';
 update GEOCAT.viz_estil set estilId=null where estilId= '349232';
 update GEOCAT.viz_geometria set geometriesId=null where geometriesId= '349234';
 update GEOCAT.viz_visualitzacio set businessId= '63be4ee874e5f4eb3bf2705e68070248', entitat= '1', geometriesColleccioId= NULL, geometry_type= 'marker', nom= 'borrar test punt', options= '{"propName":"nom,text,latitud,longitud,etrs89_x,etrs89_y,alcada"}', tipus= 'origenTematic' where id= '349232';
