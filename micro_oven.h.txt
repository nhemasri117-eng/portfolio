/* 
 * File:   micro_oven.h
 * Author: Hemas
 *
 * Created on 12 January, 2026, 4:27 PM
 */

#ifndef MICRO_OVEN_H
#define	MICRO_OVEN_H
#define FAN               RC2
#define FAN_DDR           TRISC2
# define ON                1
#define OFF                0
#define PAUSE              0x80
#define STOP               0x90
 

#define POWER_SCREEN      0x10
#define MENU_SCREEN       0x20 
#define MICRO_MODE        0x30
#define GRILL_MODE        0x40
#define CONVECTION_MODE   0x50
#define START_MODE        0x60
#define DISPLAY_TIME      0x70
#define RESET_FLAG        0x31
#define RESET_NOTHING     0xFF



void display_power_Screen(void);
void display_modes(void);
void set_time( unsigned char key, unsigned  char reset_flag);
void display_time(void);
void set_temp( unsigned char key ,unsigned char  reset_flag);

void heat_food(void);

#endif	/* MICRO_OVEN_H */

