import java.util.Scanner;

public class Keyboard {
    private Scanner in;
    Keyboard(){
        in = new Scanner(System.in);
    }
    public int  readInteger(String promptMsg , String errorMsg, int low, int high){
        int num=0;
        String strInput;
        boolean valid= false;

        while(valid == false){
            //prompt user
            System.out.print(promptMsg);// message i want the user to see
            strInput= in.nextLine();
            //try to convert string to int
            try{
                num =  Integer.parseInt(strInput);
                if(num >= low && num <= high){
                    valid = true;
                }
                else{
                    System.out.println(errorMsg);//if wrong number user sees error message i want them to see
                }
            }
            // if the String is not in the right format prints out statement below
            catch(NumberFormatException e){
                System.out.println("Invalid input");
            }
        }
        return num;
    }

    public double readDouble(String promptMsg , String errorMsg, double low){
        double num=0;
        String strInput;
        boolean valid= false;

        while(valid == false){
            //prompt user
            System.out.print(promptMsg);// message i want the user to see
            strInput= in.nextLine();
            //try to convert string to double
            try{
                num =  Double.parseDouble(strInput);
                if(num >= low){
                    valid = true;
                }
                else{
                    System.out.println(errorMsg);//if wrong number user sees error message i want them to see
                }
            }
            // if String is not in the right format prints out statement below
            catch(NumberFormatException e){
                System.out.println("Invalid input");
            }
        }
        return num;
    }
}
