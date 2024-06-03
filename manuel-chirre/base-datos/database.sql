-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	id serial4 NOT NULL,
	nombre varchar(255) NOT NULL,
	correo varchar(255) NOT NULL,
	telefono varchar(255) NOT NULL,
	puesto varchar(255) NOT NULL,
	rol varchar(255) NOT NULL,
	"password" text NULL,
	CONSTRAINT usuarios_pkey PRIMARY KEY (id)
);


INSERT INTO public.usuarios
(nombre, correo, telefono, puesto, rol, "password")
VALUES('Juan Pérez', 'juan@example.com', '123456789', 'Gerente de Tienda', 'ENCARGADO', '$2b$10$29uC.rfylfX21QE7hdeYduajhFy.7CIat8VXl7v9a65zJYvCwV6s2');
INSERT INTO public.usuarios
(nombre, correo, telefono, puesto, rol, "password")
VALUES('María López', 'maria@example.com', '987654321', 'Vendedor', 'VENDEDOR', '$2b$10$19YA9QpUEOS5IZAmCnQkLO.wAZOEJKu8p6WMd.cnSwXSjHJMN145a');
INSERT INTO public.usuarios
(nombre, correo, telefono, puesto, rol, "password")
VALUES('Carlos González', 'carlos@example.com', '555666777', 'Repartidor', 'REPARTIDOR', '$2b$10$7t5U1s8a46XKGyVADaInRu44XBdrSaDlfZ.48yQyBadicuAGALv4e');
INSERT INTO public.usuarios
(nombre, correo, telefono, puesto, rol, "password")
VALUES('Ana Martínez', 'ana@example.com', '111222333', 'Delivery', 'DELIVERY', '$2b$10$KXTnCYlfeyNF76ckmQT/huvn/14oBR9jA95Mkg5jFJoUUST.NEVT6');
INSERT INTO public.usuarios
(nombre, correo, telefono, puesto, rol, "password")
VALUES('manolo', 'manuel@gmail.com', '992423122', 'vendedor', 'VENDEDOR', '$2b$10$/AJwtjMeLgw30QDaGUHTc.zxtxlz7jAwR3jOqV3swJYQDWhc11dZi');
INSERT INTO public.usuarios
(nombre, correo, telefono, puesto, rol, "password")
VALUES('pedro', 'pepito@gmail.com', '99586232', 'Vendedor', 'VENDEDOR', '$2b$10$NT7Yp4con1KxXnLyJsN2i.yLgrQXqHGvZ1iOBDsrUwO56Bolt4FOy');




-- public.productos definition

-- Drop table

-- DROP TABLE public.productos;

CREATE TABLE public.productos (
	sku varchar(255) NOT NULL,
	nombre varchar(255) NOT NULL,
	tipo varchar(255) NULL,
	etiquetas _text NULL,
	precio numeric(10, 2) NOT NULL,
	unidad_medida varchar(50) NOT NULL,
	CONSTRAINT productos_pkey PRIMARY KEY (sku)
);

INSERT INTO public.productos
(sku, nombre, tipo, etiquetas, precio, unidad_medida)
VALUES('SKU001', 'Manzana Roja', 'Fruta', '{fruta,natural,saludable}', 1.50, 'kg');
INSERT INTO public.productos
(sku, nombre, tipo, etiquetas, precio, unidad_medida)
VALUES('SKU002', 'Leche Entera', 'Lácteo', '{lácteo,bebida,natural}', 0.99, 'litro');
INSERT INTO public.productos
(sku, nombre, tipo, etiquetas, precio, unidad_medida)
VALUES('SKU003', 'Pan Integral', 'Panadería', '{panadería,integral,saludable}', 2.50, 'unidad');
INSERT INTO public.productos
(sku, nombre, tipo, etiquetas, precio, unidad_medida)
VALUES('SKU004', 'Cereal de Avena', 'Cereal', '{cereal,desayuno,saludable}', 3.75, 'caja');
INSERT INTO public.productos
(sku, nombre, tipo, etiquetas, precio, unidad_medida)
VALUES('SKU005', 'Aceite de Oliva', 'Aceite', '{aceite,cocina,natural}', 6.80, 'litro');




-- public.pedidos definition

-- Drop table

-- DROP TABLE public.pedidos;

CREATE TABLE public.pedidos (
	numero_pedido serial4 NOT NULL,
	fecha_pedido timestamp NOT NULL,
	fecha_recepcion timestamp NULL,
	fecha_entrega timestamp NULL,
	vendedor_solicitante int4 NULL,
	repartidor int4 NULL,
	estado varchar(255) NOT NULL,
	fecha_despacho timestamp NULL,
	CONSTRAINT pedidos_pkey PRIMARY KEY (numero_pedido)
);


-- public.pedidos foreign keys

ALTER TABLE public.pedidos ADD CONSTRAINT pedidos_repartidor_fkey FOREIGN KEY (repartidor) REFERENCES public.usuarios(id);
ALTER TABLE public.pedidos ADD CONSTRAINT pedidos_vendedor_solicitante_fkey FOREIGN KEY (vendedor_solicitante) REFERENCES public.usuarios(id);


INSERT INTO public.pedidos
(fecha_pedido, fecha_recepcion, fecha_entrega, vendedor_solicitante, repartidor, estado, fecha_despacho)
VALUES('2024-05-30 21:39:07.898', '2024-05-30 21:40:51.978', '2024-05-30 22:08:20.574', 5, 6, 'RECIBIDO', '2024-05-30 21:44:28.346');
INSERT INTO public.pedidos
(fecha_pedido, fecha_recepcion, fecha_entrega, vendedor_solicitante, repartidor, estado, fecha_despacho)
VALUES('2024-05-30 11:53:39.331', '2024-05-30 12:58:59.183', '2024-05-30 13:06:01.032', 5, 6, 'RECIBIDO', '2024-05-30 13:01:59.853');
INSERT INTO public.pedidos
(fecha_pedido, fecha_recepcion, fecha_entrega, vendedor_solicitante, repartidor, estado, fecha_despacho)
VALUES('2024-06-02 10:37:28.576', '2024-06-02 12:12:19.721', '2024-06-02 12:14:04.568', 8, 6, 'RECIBIDO', '2024-06-02 12:13:42.911');



-- public.detalle_pedido definition

-- Drop table

-- DROP TABLE public.detalle_pedido;

CREATE TABLE public.detalle_pedido (
	id serial4 NOT NULL,
	numero_pedido int4 NULL,
	sku varchar(255) NULL,
	cantidad int4 NULL,
	CONSTRAINT detalle_pedido_pkey PRIMARY KEY (id)
);


-- public.detalle_pedido foreign keys

ALTER TABLE public.detalle_pedido ADD CONSTRAINT detalle_pedido_id_producto_fkey FOREIGN KEY (sku) REFERENCES public.productos(sku);
ALTER TABLE public.detalle_pedido ADD CONSTRAINT detalle_pedido_numero_pedido_fkey FOREIGN KEY (numero_pedido) REFERENCES public.pedidos(numero_pedido);


INSERT INTO public.detalle_pedido
(numero_pedido, sku, cantidad)
VALUES(4, 'SKU003', 3);
INSERT INTO public.detalle_pedido
(numero_pedido, sku, cantidad)
VALUES(4, 'SKU004', 3);
INSERT INTO public.detalle_pedido
(numero_pedido, sku, cantidad)
VALUES(3, 'SKU002', 3);
INSERT INTO public.detalle_pedido
(numero_pedido, sku, cantidad)
VALUES(3, 'SKU001', 3);
INSERT INTO public.detalle_pedido
(numero_pedido, sku, cantidad)
VALUES(14, 'SKU004', 4);
INSERT INTO public.detalle_pedido
(numero_pedido, sku, cantidad)
VALUES(14, 'SKU005', 2);
INSERT INTO public.detalle_pedido
(numero_pedido, sku, cantidad)
VALUES(14, 'SKU002', 3);
