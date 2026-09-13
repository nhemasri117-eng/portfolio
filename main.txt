/*
 * File:   main.c
 */

#include <xc.h>
#include "clcd.h"
#include "micro_oven.h"
#include "matrix_keypad.h"
#include "timers.h"

#pragma config WDTE = OFF  
unsigned char screen_flag = POWER_SCREEN;// Watchdog Timer Enable bit (WDT disabled)
extern unsigned char sec, min;

static void init_config(void)
{
    init_clcd();
    init_matrix_keypad();
    //configure rc2 where fan is connected as output pin
    FAN_DDR = 0;
    init_timer2();
    PEIE = 1;
    GIE = 1;
}

void main(void) 
{
    init_config();
   
    unsigned char key;
    unsigned char reset_flag;
    while (1) 
    {
        //update the screen flag based on the key pressed
        key = read_matrix_keypad(STATE);  // 1 2 3 4 5 6 7 8 9 0 * #
        if(screen_flag == MENU_SCREEN)
        {
            if(key == 1)
            {
                screen_flag = MICRO_MODE;
                clear_screen();
                clcd_print(" Power = 900W", LINE2(2));
                __delay_ms(3000);
                clear_screen();
                reset_flag = RESET_FLAG;
              
            }
            else if( key == 2)
            {
                screen_flag = GRILL_MODE;
                reset_flag = RESET_FLAG;
                clear_screen();
                
            }
            else if( key == 3)
            {
                screen_flag = CONVECTION_MODE;
                reset_flag = RESET_FLAG;
                clear_screen();
                
            }
            else if( key == 4)
            {
                screen_flag = START_MODE;
                clear_screen();
                
            }
            
        }
        // if you in display time  stop, pause resume
        else if(screen_flag == DISPLAY_TIME)
        {
            if(key == 4)
            {
                sec = sec + 30;
                if( sec > 59)
                {
                    min++;
                    sec = sec - 60;
                }
                
            }
            if( key == 5)
            {
                screen_flag = PAUSE;
                
            }
            else if(key == 6)
            {
                screen_flag = STOP;
                
            }            
        }
        else if( screen_flag == PAUSE)
        {
            if(key == 4)
            {
                // start cooking process
                TMR2ON = 1;
                FAN = 1;
                screen_flag = DISPLAY_TIME;
                
            }
            
        }
        switch( screen_flag)
        {
        // implement power screen
            case POWER_SCREEN :
                                display_power_Screen();
                                clear_screen();
                                screen_flag = MENU_SCREEN;
                                break;
            case MENU_SCREEN :    
                                display_modes();
                               
                                break;
            case MICRO_MODE :
                                set_time(key, reset_flag);
                                break;
            case DISPLAY_TIME :
                                display_time();
                                break;
            case GRILL_MODE :
                                set_time(key, reset_flag);
                                break;
            case CONVECTION_MODE :
                                // set temperature
                                set_temp(key , reset_flag);
                                // set time
                                // display time 
                                break;
            case START_MODE:
                                heat_food();
                                break;
                                
                                
                                
            case PAUSE :        TMR2ON = 0;
                                FAN = 0;
                                break;
            case STOP :
                                TMR2ON = 0;
                                FAN = 0;
                                clear_screen();
                                screen_flag = MENU_SCREEN;
                                break;
        }
        reset_flag = RESET_NOTHING ;
       
            
        //display modes screen
        //set the timer
        //display the time start and pause and stop
        //set the temperature
    }   
        
    return;
}
