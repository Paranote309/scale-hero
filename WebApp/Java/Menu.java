import java.util.ArrayList;
import java.util.Date;
import java.io.*;
import java.lang.Double;

public class Menu {
    //declaring private variables/objects
    private String stock;
    private Keyboard kb;
    private int choice;
    private int cashCard;
    private double cash;
    private String card;
    private String transaction = "transaction.txt";
    public static boolean exit = false;

    //creating ArrayLists
    ArrayList<MenuItem> menuList = new ArrayList<MenuItem>();// uses MenuItem class


    public Menu(String stock){
        this.stock = stock;
        this.kb = new Keyboard();
        ReadCsvFile();
    }

    //method to add finish transaction of user order
    public void completeTransaction(){
        // gets user  entered item
        MenuItem item = menuList.get(choice - 1);

        // if 1- goes with cash transaction class else goes with the card transaction class
        //adds the transaction to the transaction ArrayList
        if(cashCard == 1){
            transactionList.add(new CashTransaction(new Date(), item, cash, cash-item.getItemPrice()));
            System.out.printf("Here is your %s worth %.2f Change Given: %.2f\n", item.getItemName(), item.getItemPrice(), cash-item.getItemPrice());
        }
        else{
            transactionList.add(new CardTransaction(new Date(), item, card));
            System.out.printf("Here is your %s worth %.2f and your %s Card\n ", item.getItemName(), item.getItemPrice(), card);
        }
    }

    //method to read from a file
    public void ReadCsvFile(){
        try {

            // creates file reader  reads stock file
            FileReader fr = new FileReader(stock);

            // creates Buffered reader reads file object
            BufferedReader br = new BufferedReader(fr);
            String item;
            String[] itemArray;

            // read each line from the stock.txt file until the end
            while ((item = br.readLine()) != null){
                itemArray= item.split(",");
                menuList.add(new MenuItem(itemArray[0], Double.parseDouble(itemArray[1])));
            }
            br.close();

        } catch (Exception e) {
            System.out.println("Error - Cannot read from "+ stock);
        }
    }

    //method to write a file
    public void WriteFile(){
        try {
            // creates file writer with the filename true- allows it to append new information
            FileWriter fw = new FileWriter(transaction, true);

            // creates print writer with file reader
            PrintWriter pw = new PrintWriter(fw);
            // goes through the transactionList  size
            for (int i = 0; i< transactionList.size(); i++){
                //prints each  item from the list to the transaction.txt file
                pw.println(transactionList.get(i));
            }
            pw.close();

        } catch (Exception e) {
            System.out.println("Error - Cannot write to the  file ");
        }
    }

    // method to display menu to the screen
    public void displayMenu(){
        System.out.printf("\n%17s\n","MENU" );
        System.out.println("=".repeat(29));

        int i;
        //loop through options and items
        for( i = 0; i < menuList.size(); i++){
            System.out.printf("%d. %-20s %.2f\n",i+1 ,menuList.get(i).getItemName(), menuList.get(i).getItemPrice());
        }
        System.out.printf("%d. %-20s \n",i+1 ,"Exit");

        System.out.println("=".repeat(29));

        //using keyboard  class to create input for each item in the menuList
        choice = kb.readInteger("Choice: ", "Invalid Menu Choice", 1, menuList.size()+1);

        //if choice is withing the menuList should prompt user the next
        if(choice <= menuList.size()){
            //cashCard variable using keyboard class for 1(cash) and 2(card)
            cashCard = kb.readInteger("Cash[1]/Card[2]: ", "Invalid - Enter 1 or 2", 1, 2);

            //1 asks user for amount tendered
            if(cashCard == 1){
                cash = kb.readDouble("Enter amount tendered: ", "Not enough cash", menuList.get(choice-1).getItemPrice());
                completeTransaction();
            }
            else{
                //asks user  which card type
                int cardOption = kb.readInteger("Visa[1]/Mastercard[2]: ", "Invalid - Enter 1 or 2", 1, 2);
                if(cardOption == 1){
                    card="Visa";
                }
                else{
                    card="Mastercard";
                }
                completeTransaction();
            }
         }

         else{
             // when exit menu becomes true stops displays and executes write file method
             Menu.exit=true;
             WriteFile();
         }
    }
}